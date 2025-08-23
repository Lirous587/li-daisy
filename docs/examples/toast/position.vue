<template>
  <div class="flex gap-x-3 flex-nowrap">
    <button class="btn" @click="toastFunc('top-start')">top-start</button>
    <button class="btn" @click="toastFunc('top-end')">top-end</button>
    <button class="btn" @click="toastFunc('bottom-start')">bottom-start</button>
    <button class="btn" @click="toastFunc('bottom-end')">bottom-end</button>
  </div>
</template>

<script setup lang="ts">
import { Toast, type ToastPosition, type ToastType } from 'li-daisy'

const toastFunc = (position: ToastPosition) => {
  const options = {
    title: '这是消息标题',
    message: `该消息位于 ${position}`,
    position: position,
  }

  Toast.info({
    ...options,
  })
}
</script>
