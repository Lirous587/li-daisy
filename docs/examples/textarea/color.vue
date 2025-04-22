<template>
  <div class="flex flex-col gap-4">
    <Textarea placeholder="我是ghost" color="ghost" />
    <Textarea color="neutral" />
    <Textarea color="primary" />
    <Textarea color="secondary" />
    <Textarea color="accent" />
    <Textarea color="info" />
    <Textarea color="success" />
    <Textarea color="warning" />
    <Textarea color="error" />
  </div>
</template>

<script setup lang="ts">
import { Textarea } from 'li-daisy'
</script>
