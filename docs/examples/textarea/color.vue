<template>
  <div class="flex flex-col gap-4">
    <Textarea
      v-for="color in colors"
      :key="color"
      v-model="text"
      :color="color"
      placeholder="请输入文本"
    />
  </div>
</template>

<script setup lang="ts">
import { Textarea, type TextareaColor } from 'li-daisy'
import { ref } from 'vue'

const colors = ref<TextareaColor[]>([
  'neutral',
  'primary',
  'secondary',
  'accent',
  'info',
  'success',
  'warning',
  'error',
])

const text = ref('')
</script>
