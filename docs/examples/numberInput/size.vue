<template>
  <div class="flex flex-col gap-y-4">
    <NumberInput v-model="numberValue" size="xs" />
    <NumberInput v-model="numberValue" size="sm" />
    <NumberInput v-model="numberValue" size="md" />
    <NumberInput v-model="numberValue"size="lg" />
    <NumberInput v-model="numberValue" size="xl" />
  </div>
</template>

<script setup lang="ts">
import { NumberInput } from 'li-daisy'
import { ref } from 'vue'
const numberValue = ref<number>(0)
</script>
