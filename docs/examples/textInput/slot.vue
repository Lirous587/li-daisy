<template>
  <TextInput placeholder="请输入文本">
    <template #prefix>
      <div class="btn btn-primary btn-soft btn-sm">前缀</div>
    </template>
    <template #suffix>
      <div class="btn btn-secondary btn-soft btn-sm">后缀</div>
    </template>
  </TextInput>
</template>

<script setup lang="ts">
import { TextInput } from 'li-daisy'
</script>
