import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useMyThemeStore = defineStore('myThemeStore', () => {
  const theme = ref('default')

  // 所有暗色主题
  const darkThemes = [
    'dark',
    'synthwave',
    'halloween',
    'forest',
    'aqua',
    'black',
    'luxury',
    'dracula',
    'business',
    'night',
    'coffee',
    'dim',
    'sunset',
    'abyss',
  ]

  const initMode = () => {
    const nowTheme = localStorage.theme || 'default'
    setMode(nowTheme)
  }

  const setMode = (value: string) => {
    // 设置 data-theme
    document.documentElement.setAttribute('data-theme', value)
    document.documentElement.classList.remove(theme.value)
    document.documentElement.classList.add('value')
    localStorage.theme = value
    theme.value = value
  }

  const getMode = () => {
    return theme
  }

  const ifDark = computed(() => {
    return darkThemes.includes(theme.value)
  })

  return {
    theme,
    initMode,
    setMode,
    getMode,
    ifDark,
  }
})
