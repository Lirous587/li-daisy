<template>
  <div class="flex gap-4 items-center m-3">
    <Avatar avatar="https://picsum.photos/600/600" @success="handleSuccess" />
    <Avatar avatar="noexist" text="Li" size="lg" @failed="handleFailed" />
  </div>
</template>

<script setup lang="ts">
import { Avatar } from 'li-daisy'

const handleSuccess = () => {
  console.log('load success')
}

const handleFailed = () => {
  console.log('load failed')
}
</script>
