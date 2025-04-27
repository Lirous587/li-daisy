<template>
  <div class="flex flex-col gap-y-4">
    <NumberInput size="xs" />
    <NumberInput size="sm" />
    <NumberInput size="md" />
    <NumberInput size="lg" />
    <NumberInput size="xl" />
  </div>
</template>

<script setup lang="ts">
import { NumberInput } from 'li-daisy'
import { ref } from 'vue'
</script>

<!-- <template>
  <NumberInput v-model="priority" class="w-full" placeholder="请输入优先级" :min="20" :max="30" />
</template>
 -->
