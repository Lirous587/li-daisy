<template>
  <div class="flex flex-col gap-4">
    <NumberInput
      v-for="color in colors"
      :key="color"
      v-model="numberValue"
      class="w-64 mx-auto"
      :color="color"
      :disabled="true"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { NumberInput, type NumberInputColor } from 'li-daisy'

const colors = ref<NumberInputColor[]>([
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

const numberValue = ref<number>(10)
</script>
