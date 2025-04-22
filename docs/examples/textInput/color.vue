<template>
  <div class="flex flex-col gap-4">
    <TextInput placeholder="我是ghost" color="ghost" />
    <TextInput color="neutral" />
    <TextInput color="primary" />
    <TextInput color="secondary" />
    <TextInput color="accent" />
    <TextInput color="info" />
    <TextInput color="success" />
    <TextInput color="warning" />
    <TextInput color="error" />
  </div>
</template>

<script setup lang="ts">
import { TextInput } from 'li-daisy'
</script>
