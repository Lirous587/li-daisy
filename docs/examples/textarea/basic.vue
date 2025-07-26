<template>
  <Textarea v-model="text" placeholder="请输入文本" :maxlength="30" color="primary" />
</template>

<script setup lang="ts">
import { Textarea } from 'li-daisy'
import { ref } from 'vue'
const text = ref<string>('')
</script>
