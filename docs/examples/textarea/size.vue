<template>
  <div class="flex flex-col gap-y-4">
    <Textarea v-model="text" size="xs" placeholder="请输入文本" />
    <Textarea v-model="text" size="sm" placeholder="请输入文本" />
    <Textarea v-model="text" size="md" placeholder="请输入文本" />
    <Textarea v-model="text" size="lg" placeholder="请输入文本" />
    <Textarea v-model="text" size="xl" placeholder="请输入文本" />
  </div>
</template>

<script setup lang="ts">
import { Textarea } from 'li-daisy'
import { ref } from 'vue'
const text = ref<string>('')
</script>
