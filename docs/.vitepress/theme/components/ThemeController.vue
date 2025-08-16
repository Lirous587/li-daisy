<template>
  <ThemeController ref="themeRef" @change="handleThemeChange" :theme="theme" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ThemeController, type ThemeControllerRef } from 'li-daisy'
import { useMyThemeStore } from '../stores/theme'
import { onBeforeMount } from 'vue'
import { ref } from 'vue'
import { onMounted } from 'vue'

const themeRef = ref<ThemeControllerRef>()

const themeStore = useMyThemeStore()

const theme = computed(() => themeStore.theme)

const handleThemeChange = (theme: string, ifDark: boolean) => {
  themeStore.setTheme(theme)
  themeStore.setDark(ifDark)
}

onMounted(() => {
  themeStore.initTheme()
  if (themeRef.value) {
    const ifDark = themeRef.value.setTheme(theme.value)
    themeStore.setDark(ifDark)
  }
})
</script>
