<template>
  <div class="flex flex-col gap-4">
    <TextInput placeholder="请输入文本" :maxlength="30" color="primary" />
    <TextInput type="password" placeholder="请输入密码" color="secondary" />
    <TextInput type="search" placeholder="请输入搜素内容" color="secondary" />
  </div>
</template>

<script setup lang="ts">
import { TextInput } from 'li-daisy'
</script>
