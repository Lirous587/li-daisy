<template>
  <DefaultTheme.Layout>
    <template #nav-bar-content-after> </template>
  </DefaultTheme.Layout>
</template>

<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'

// 导入需要的 Vue 函数和 Shiki 类型
import { computed, nextTick, onMounted, provide, ref, shallowRef } from 'vue'

import type { Highlighter } from 'shiki'

// 创建 shallowRef 存储实例
const shikiHighlighter = shallowRef<Highlighter | null>(null)

provide('shiki', shikiHighlighter)

const setTheme = (theme: string) => {
  localStorage.setItem('li-daisy-theme', theme)
}

const getTheme = () => {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return 'li-dark'
  }

  const storedTheme = localStorage.getItem('li-daisy-theme')
  const validThemes = ['li-light', 'li-dark']
  // 如果存储的主题是有效的，返回它
  if (storedTheme && validThemes.includes(storedTheme)) {
    return storedTheme
  }

  // 回退机制：尝试系统偏好
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'li-dark'
  }

  // 最终回退到默认浅色主题
  return 'li-light'
}

// 从 DOM 读取当前主题状态
const getCurrentThemeFromDOM = () => {
  if (typeof document === 'undefined') return 'li-dark'
  return document.documentElement.getAttribute('data-theme') || getTheme()
}

const nowTheme = ref(getCurrentThemeFromDOM())

const isDark = computed(() => nowTheme.value === 'li-dark')

const switchTheme = async (event: MouseEvent) => {
  const { clientX: x, clientY: y } = event

  if (nowTheme.value === 'li-dark') {
    nowTheme.value = 'li-light'
  } else if (nowTheme.value === 'li-light') {
    nowTheme.value = 'li-dark'
  } else {
    nowTheme.value = 'li-light'
  }

  // 保存到 localStorage
  setTheme(nowTheme.value)

  // 执行动画
  await switchAnimation(x, y)
}

// 检查是否支持 View Transition
const enableTransitions = () =>
  'startViewTransition' in document &&
  window.matchMedia('(prefers-reduced-motion: no-preference)').matches

// 应用主题到 DOM
const applyTheme = () => {
  document.documentElement.setAttribute('data-theme', nowTheme.value)

  if (isDark.value) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

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

provide('toggle-appearance', switchTheme)

onMounted(async () => {
  const domTheme = document.documentElement.getAttribute('data-theme')
  if (domTheme && domTheme !== nowTheme.value) {
    nowTheme.value = domTheme as 'li-light' | 'li-dark'
  } else {
    // 如果 DOM 没有主题属性，则应用当前主题
    applyTheme()
  }
  try {
    const { createHighlighter } = await import('shiki')
    shikiHighlighter.value = await createHighlighter({
      themes: ['plastic'], // 只加载 plastic 主题
      langs: ['vue'], // 只加载 vue 语言
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
