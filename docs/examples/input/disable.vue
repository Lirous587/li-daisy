<template>
  <Input placeholder="此输入框禁用" :maxlength="30" :disabled="true">
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
