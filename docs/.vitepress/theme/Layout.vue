<template>
  <div :class="isTransitioning ? 'transition-all duration-[400] opacity-20' : ''">
    <DefaultTheme.Layout>
      <!-- 在桌面导航栏末尾添加 -->
      <template #nav-bar-content-after>
        <div class="h-[24px] w-[1px] ml-[16px] mr-[8px] bg-[var(--vp-c-divider)]"></div>
        <div class="flex w-[36px]">
          <DarkModeSwitch class="m-auto" />
        </div>
      </template>
    </DefaultTheme.Layout>
  </div>
</template>

<script setup lang="ts">
import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
// 导入需要的 Vue 函数和 Shiki 类型
import { nextTick, onMounted, provide, ref, shallowRef } from 'vue'

import type { Highlighter } from 'shiki'

import DarkModeSwitch from './components/DarkModeSwitch.vue'

const isTransitioning = ref(false)
const { isDark } = useData()

// 创建 shallowRef 存储实例
const shikiHighlighter = shallowRef<Highlighter | null>(null)

onMounted(async () => {
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

provide('shiki', shikiHighlighter)

const enableTransitions = () =>
  'startViewTransition' in document &&
  window.matchMedia('(prefers-reduced-motion: no-preference)').matches

provide('toggle-appearance', async ({ clientX: x, clientY: y }: MouseEvent) => {
  if (isTransitioning.value) return
  isTransitioning.value = true

  if (!enableTransitions()) {
    isDark.value = !isDark.value
    isTransitioning.value = false
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
    isDark.value = !isDark.value
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

  if (isDark.value) {
    document.documentElement.setAttribute('data-theme', 'dark')
  } else {
    document.documentElement.setAttribute('data-theme', 'light')
  }

  setTimeout(() => {
    isTransitioning.value = false
  }, 400)
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
  z-index: 9999;
}
</style>
