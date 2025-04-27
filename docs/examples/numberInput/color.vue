<template>
  <div class="flex flex-col gap-4">
    <NumberInput placeholder="我是ghost" color="ghost" />
    <NumberInput color="neutral" />
    <NumberInput color="primary" />
    <NumberInput color="secondary" />
    <NumberInput color="accent" />
    <NumberInput color="info" />
    <NumberInput color="success" />
    <NumberInput color="warning" />
    <NumberInput color="error" />
  </div>
</template>

<script setup lang="ts">
import { NumberInput } from 'li-daisy'
</script>
