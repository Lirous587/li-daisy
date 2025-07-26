<template>
  <Textarea v-model="text" placeholder="请输入文本" :min-rows="1" :max-rows="10" :auto-grow="false" />
</template>

<script setup lang="ts">
import { Textarea } from 'li-daisy'
import { ref } from 'vue'
const text = ref<string>('')
</script>
