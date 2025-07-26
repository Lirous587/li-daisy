<template>
  <TextInput v-model="text" placeholder="此输入框禁用" :maxlength="30" :disabled="true" />
</template>

<script setup lang="ts">
import { TextInput } from 'li-daisy'
import { ref } from 'vue'
const text = ref<string>('')
</script>
