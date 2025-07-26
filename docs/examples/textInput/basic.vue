<template>
  <div class="flex flex-col gap-4">
    <TextInput v-model="text" placeholder="请输入文本" :maxlength="30" color="primary" />
    <TextInput v-model="text" type="password" placeholder="请输入密码" color="secondary" />
    <TextInput v-model="text" type="search" placeholder="请输入搜素内容" color="secondary" />
  </div>
</template>

<script setup lang="ts">
import { TextInput } from 'li-daisy'
import { ref } from 'vue'
const text = ref<string>('')
</script>
