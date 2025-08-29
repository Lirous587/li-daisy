<template>
  <div class="flex flex-col gap-y-4">
    <TextInput v-model="text" placeholder="请输入文本" type="text" />
    <TextInput v-model="text" placeholder="请输入密码" type="password" />
    <TextInput v-model="text" placeholder="请输入邮件" type="email" />
    <TextInput v-model="text" placeholder="请输入url" type="url" />
    <TextInput v-model="text" placeholder="请输入tel" type="tel" />
    <TextInput v-model="text" placeholder="search类型" type="search" />
  </div>
</template>

<script setup lang="ts">
import { TextInput } from 'li-daisy'
import { ref } from 'vue'

const text = ref('')
</script>
