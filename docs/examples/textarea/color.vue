<template>
  <div class="flex flex-col gap-4">
    <Textarea v-for="color in colors" v-model="text" :color="color" />
  </div>
</template>

<script setup lang="ts">
import { Textarea, type TextareaColor } from 'li-daisy'
import { ref } from 'vue'

const colors = ref<TextareaColor[]>([
  'base',
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
