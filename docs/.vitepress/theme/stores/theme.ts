import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMyThemeStore = defineStore('myThemeStore', () => {
  const theme = ref('synthwave')
  const themeKey = 'theme'

  const initTheme = () => {
    const nowTheme = localStorage.getItem(themeKey) || 'synthwave'
    theme.value = nowTheme
    setTheme(nowTheme)
  }

  const setTheme = (nowTheme: string) => {
    // 设置 data-theme
    document.documentElement.setAttribute('data-theme', nowTheme)
    localStorage.setItem(themeKey, nowTheme)
    theme.value = nowTheme
  }

  const setDark = (status: boolean) => {
    if (status) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  return {
    theme,
    initTheme,
    setTheme,
    setDark,
  }
})
