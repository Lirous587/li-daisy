<template>
  <div class="flex flex-col items-center gap-y-3">
    <p class="font-bold">theme:{{ theme }}</p>
    <p class="font-bold">ifDark:{{ ifDark }}</p>
    <div class="h-100 w-full flex justify-around">
      <ThemeController
        v-model:theme="theme"
        v-model:ifDark="ifDark"
        @change="handleThemeChange"
        align="left"
      >
        <div class="btn">left</div>
      </ThemeController>
      <ThemeController
        v-model:theme="theme"
        v-model:ifDark="ifDark"
        @change="handleThemeChange"
        align="center"
      >
        <div class="btn">center</div>
      </ThemeController>
      <ThemeController
        v-model:theme="theme"
        v-model:ifDark="ifDark"
        @change="handleThemeChange"
        align="right"
      >
        <div class="btn">right</div>
      </ThemeController>
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
