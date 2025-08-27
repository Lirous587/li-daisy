<template>
  <div class="flex flex-col gap-y-4">
    <TextInput placeholder="请输入文本" type="text" />
    <TextInput placeholder="请输入密码" type="password" />
    <TextInput placeholder="请输入邮件" type="email" />
    <TextInput placeholder="请输入url" type="url" />
    <TextInput placeholder="请输入tel" type="tel" />
    <TextInput placeholder="search类型" type="search" />
  </div>
</template>

<script setup lang="ts">
import { TextInput } from 'li-daisy'
import { ref } from 'vue'
</script>
