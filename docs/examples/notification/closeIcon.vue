<template>
  <div class="space-x-3">
    <button class="li-btn" @click="toastFunc">此通知无关闭图标</button>
  </div>
</template>

<script setup lang="ts">
import { Notification } from 'li-daisy'

const toastFunc = () => {
  Notification.info({
    title: '这是通知标题',
    message: `这条通知无关闭图标`,
    showCloseIcon: false,
    // 此时即使设置了autoClose为false 该通知依旧会自动关闭
    autoClose: false,
  })
}
</script>
