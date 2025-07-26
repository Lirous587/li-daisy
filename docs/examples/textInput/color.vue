<template>
  <div class="flex flex-col gap-4">
    <TextInput v-model="text" placeholder="我是ghost" color="ghost" />
    <TextInput v-model="text" color="neutral" />
    <TextInput v-model="text" color="primary" />
    <TextInput v-model="text" color="secondary" />
    <TextInput v-model="text" color="accent" />
    <TextInput v-model="text" color="info" />
    <TextInput v-model="text" color="success" />
    <TextInput v-model="text" color="warning" />
    <TextInput v-model="text" color="error" />
  </div>
</template>

<script setup lang="ts">
import { TextInput } from 'li-daisy'
import { ref } from 'vue'
const text = ref<string>('')
</script>
