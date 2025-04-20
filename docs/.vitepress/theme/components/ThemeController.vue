<template>
  <ThemeController @change="handleThemeChange" :theme="theme" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ThemeController } from '../../../../packages/index'
import { useMyThemeStore } from '../store/theme'
import { onBeforeMount } from 'vue'

const themeStore = useMyThemeStore()

const theme = computed(() => themeStore.theme)

const handleThemeChange = (theme: string) => {
  themeStore.setTheme(theme)
  // document.documentElement.setAttribute('data-theme', theme)
}

onBeforeMount(() => {
  themeStore.initTheme()
})
</script>
