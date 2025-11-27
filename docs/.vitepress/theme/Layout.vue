<template>
  <DefaultTheme.Layout />
</template>

<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import { computed, onMounted, provide, ref } from 'vue'
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

const switchTheme = () => {
  if (isServer()) return

  // 添加禁用过渡的类
  document.documentElement.classList.add('disable-transitions')

  nowTheme.value = nowTheme.value === 'li-dark' ? 'li-light' : 'li-dark'
  setTheme(nowTheme.value)
  applyTheme()

  // 强制重绘,确保禁用过渡生效
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  document.documentElement.offsetHeight

  // 在下一帧移除禁用类,恢复过渡
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      document.documentElement.classList.remove('disable-transitions')
    })
  })
}

provide('toggle-appearance', switchTheme)

onMounted(() => {
  nowTheme.value = getTheme()

  // 移除初始化时注入的样式
  // 使用双重 requestAnimationFrame 确保在移除前浏览器已经完成了首次渲染
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      const noTransitions = document.getElementById('vp-no-transitions')
      if (noTransitions) noTransitions.remove()

      // 背景色样式也可以移除了，因为此时 CSS 文件应该已经加载完成
      const darkBg = document.getElementById('vp-dark-bg')
      if (darkBg) darkBg.remove()
    })
  })
})
</script>

<style>
.disable-transitions,
.disable-transitions *,
.disable-transitions *::before,
.disable-transitions *::after {
  transition: none !important;
  animation: none !important;
}
</style>
