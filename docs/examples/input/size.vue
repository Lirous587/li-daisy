<template>
  <div class="flex flex-col gap-y-4">
    <Input size="xs" placeholder="请输入文本" :maxlength="30" />
    <Input size="sm" placeholder="请输入文本" :maxlength="30" />
    <Input size="md" placeholder="请输入文本" :maxlength="30" />
    <Input size="lg" placeholder="请输入文本" :maxlength="30" />
    <Input size="xl" placeholder="请输入文本" :maxlength="30" />
  </div>
</template>

<script setup lang="ts">
import { Input } from 'li-daisy'
</script>
