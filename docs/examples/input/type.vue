<template>
  <div class="flex flex-col gap-y-4">
    <Input placeholder="请输入文本" type="text" />
    <Input placeholder="请输入密码" type="password" />
    <Input placeholder="请输入邮件" type="email" />
    <Input placeholder="请输入url" type="url" />
    <Input placeholder="请输入tel" type="tel" />
    <Input placeholder="search类型" type="search" />
  </div>
</template>

<script setup lang="ts">
import { Input } from 'li-daisy'
</script>
