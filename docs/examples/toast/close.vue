<template>
  <div class="space-x-3">
    <button class="btn" @click="toastFunc">此消息无图标</button>
  </div>
</template>

<script setup lang="ts">
import { toast, type ToastType } from 'li-daisy'

const toastFunc = () => {
  toast.info({
    title: '这是消息标题',
    message: `这是一条消息`,
    closeIcon: true,
    duration: 1000,
  })
}
</script>
