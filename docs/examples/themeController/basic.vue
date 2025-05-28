<template>
  <div class="flex flex-col items-center">
    <p class="font-bold">theme:{{ theme }}</p>
    <p class="font-bold">ifDark:{{ ifDark }}</p>
    <div class="h-100">
      <ThemeController
        v-model:theme="theme"
        v-model:ifDark="ifDark"
        @change="handleThemeChange"
        :themes="['dark', 'light']"
        align="center"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ThemeController } from 'li-daisy'

const theme = ref('dark')
const ifDark = ref(false)

const handleThemeChange = (theme: string) => {
  document.documentElement.setAttribute('data-theme', theme)
}
</script>
