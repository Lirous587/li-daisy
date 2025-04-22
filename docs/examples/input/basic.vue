<template>
  <Input placeholder="请输入文本" :maxlength="30" class="input-primary">
    <template #prefix>
      <div class="btn btn-primary btn-soft btn-sm">前缀</div>
    </template>
    <template #suffix>
      <div class="btn btn-secondary btn-soft btn-sm">后缀</div>
    </template>
  </Input>
</template>

<script setup lang="ts">
import { Input } from 'li-daisy'
</script>
