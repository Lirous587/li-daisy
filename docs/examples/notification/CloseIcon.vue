<template>
  <div class="space-x-3">
    <button class="btn" @click="toastFunc">此消息无关闭图标</button>
  </div>
</template>

<script setup lang="ts">
import { Notification } from 'li-daisy'

const toastFunc = () => {
  Notification.info({
    title: '这是消息标题',
    message: `这条消息无关闭图标`,
    showCloseIcon: false,
    // 此时即使设置了autoClose为false 该消息依旧会自动关闭
    autoClose: false,
  })
}
</script>
