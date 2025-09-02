<template>
  <DefaultTheme.Layout />
</template>

<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import { computed, nextTick, onMounted, provide, ref, shallowRef } from 'vue'
import type { Highlighter } from 'shiki'
import { isClient, isServer } from '../../../packages/utils/ssr'

const nowTheme = ref('li-light')
const isDark = computed(() => nowTheme.value === 'li-dark')

const setTheme = (theme: string) => {
  if (isClient()) {
    localStorage.setItem('li-daisy-theme', theme)
  }
}

const getTheme = () => {
  if (isServer()) return 'li-light'

  const stored = localStorage.getItem('li-daisy-theme')
  const validThemes = ['li-light', 'li-dark']

  if (stored && validThemes.includes(stored)) {
    return stored
  }

  if (window.matchMedia?.('(prefers-color-scheme: dark)').matches) {
    return 'li-dark'
  }

  return 'li-light'
}

const applyTheme = () => {
  if (isServer()) return

  document.documentElement.setAttribute('data-theme', nowTheme.value)
  document.documentElement.classList.toggle('dark', isDark.value)
}

const enableTransitions = () =>
  isClient() &&
  'startViewTransition' in document &&
  window.matchMedia('(prefers-reduced-motion: no-preference)').matches

const switchAnimation = async (x: number, y: number) => {
  if (!enableTransitions()) {
    // 直接应用主题
    applyTheme()
    return
  }

  const clipPath = [
    `circle(0px at ${x}px ${y}px)`,
    `circle(${Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y),
    )}px at ${x}px ${y}px)`,
  ]

  if (isServer()) return

  await document.startViewTransition(async () => {
    applyTheme()
    await nextTick()
  }).ready

  document.documentElement.animate(
    { clipPath: isDark.value ? clipPath.reverse() : clipPath },
    {
      duration: 400,
      easing: 'ease-in',
      pseudoElement: `::view-transition-${isDark.value ? 'old' : 'new'}(root)`,
    },
  )
}

const switchTheme = async (event: MouseEvent) => {
  const { clientX: x, clientY: y } = event

  nowTheme.value = nowTheme.value === 'li-dark' ? 'li-light' : 'li-dark'
  setTheme(nowTheme.value)

  await switchAnimation(x, y)
}

provide('toggle-appearance', switchTheme)

// 创建 shallowRef 存储实例
const shikiHighlighter = shallowRef<Highlighter | null>(null)
provide('shiki', shikiHighlighter)

onMounted(async () => {
  // 同步主题状态
  nowTheme.value = getTheme()
  applyTheme()

  // 确保页面已经标记为就绪
  if (!document.documentElement.hasAttribute('data-theme-ready')) {
    document.documentElement.setAttribute('data-theme-ready', '')
  }

  try {
    const { createHighlighter } = await import('shiki')
    shikiHighlighter.value = await createHighlighter({
      themes: ['plastic'],
      langs: ['vue'],
    })
    console.log('Shiki highlighter initialized in Layout.')
  } catch (error) {
    console.error('Failed to initialize Shiki highlighter:', error)
  }
})
</script>

<style>
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}

::view-transition-old(root),
.dark::view-transition-new(root) {
  z-index: 1;
}

::view-transition-new(root),
.dark::view-transition-old(root) {
  z-index: 99999;
}
</style>
