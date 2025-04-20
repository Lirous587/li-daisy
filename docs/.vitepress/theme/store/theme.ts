import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMyThemeStore = defineStore('myThemeStore', () => {
  const theme = ref('default')

  const initTheme = () => {
    const nowTheme = localStorage.theme || 'synthwave'
    theme.value = nowTheme
    setTheme(nowTheme)
  }

  const setTheme = (value: string) => {
    // 设置 data-theme
    document.documentElement.setAttribute('data-theme', value)
    localStorage.theme = value
    theme.value = value
  }

  return {
    theme,
    initTheme,
    setTheme,
  }
})
