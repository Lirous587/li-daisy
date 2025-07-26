<template>
  <div class="flex flex-col gap-4">
    <NumberInput v-model="numberValue" placeholder="我是ghost" color="ghost" />
    <NumberInput v-model="numberValue" color="neutral" />
    <NumberInput v-model="numberValue" color="primary" />
    <NumberInput v-model="numberValue" color="secondary" />
    <NumberInput v-model="numberValue" color="accent" />
    <NumberInput v-model="numberValue" color="info" />
    <NumberInput v-model="numberValue" color="success" />
    <NumberInput v-model="numberValue" color="warning" />
    <NumberInput v-model="numberValue" color="error" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { NumberInput } from 'li-daisy'
const numberValue = ref<number>(0)
</script>
