<template>
  <div class="flex gap-x-3 flex-nowrap">
    <button class="btn" @click="toastFunc('top-start')">top-start</button>
    <button class="btn" @click="toastFunc('top-end')">top-end</button>
    <button class="btn" @click="toastFunc('bottom-start')">bottom-start</button>
    <button class="btn" @click="toastFunc('bottom-end')">bottom-end</button>
  </div>
</template>

<script setup lang="ts">
import { Notification, type NotificationPosition } from 'li-daisy'

const toastFunc = (position: NotificationPosition) => {
  const options = {
    title: '这是通知标题',
    message: `该通知位于 ${position}`,
    position: position,
  }

  Notification.info({
    ...options,
  })
}
</script>
