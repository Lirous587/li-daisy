<template>
  <div class="flex flex-col gap-4">
    <Textarea v-model="text" placeholder="我是ghost" color="ghost" />
    <Textarea v-model="text" color="neutral" />
    <Textarea v-model="text" color="primary" />
    <Textarea v-model="text" color="secondary" />
    <Textarea v-model="text" color="accent" />
    <Textarea v-model="text" color="info" />
    <Textarea v-model="text" color="success" />
    <Textarea v-model="text" color="warning" />
    <Textarea v-model="text" color="error" />
  </div>
</template>

<script setup lang="ts">
import { Textarea } from 'li-daisy'
import { ref } from 'vue'
const text = ref<string>('')
</script>
