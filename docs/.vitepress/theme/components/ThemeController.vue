<template>
  <ThemeController @change="handleThemeChange" :theme="theme" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ThemeController } from '../../../../packages/index'
import { useMyThemeStore } from '../store/theme'
import { onMounted } from 'vue'

const theme = ref('dark')

const themeStore = useMyThemeStore()

const handleThemeChange = (theme: string) => {
  themeStore.setTheme(theme)
  // document.documentElement.setAttribute('data-theme', theme)
}

onMounted(() => {
  themeStore.initTheme()
})
</script>
