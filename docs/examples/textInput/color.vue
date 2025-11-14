<template>
  <div class="flex flex-col gap-4">
    <TextInput v-for="color in colors" :key="color" v-model="text" :color="color" />
  </div>
</template>

<script setup lang="ts">
import { TextInput, type TextInputColor } from 'li-daisy'

import { ref } from 'vue'

const colors = ref<TextInputColor[]>([
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
