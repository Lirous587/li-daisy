<template>
  <div class="flex gap-x-3 flex-nowrap">
    <button class="btn btn-primary" @click="toastFunc('primary')">primary</button>
    <button class="btn btn-info" @click="toastFunc('info')">info</button>
    <button class="btn btn-success" @click="toastFunc('success')">success</button>
    <button class="btn btn-warning" @click="toastFunc('warning')">warn</button>
    <button class="btn btn-error" @click="toastFunc('error')">error</button>
  </div>
</template>

<script setup lang="ts">
import { Notification, type NotificationType } from 'li-daisy'

const toastFunc = (type: NotificationType) => {
  const options = {
    title: '这是通知标题',
    message: `这是一条 ${type} 通知`,
  }

  switch (type) {
    case 'primary':
      return Notification.primary({
        ...options,
      })
    case 'info':
      return Notification.info({
        ...options,
      })
    case 'success':
      return Notification.success({
        ...options,
      })
    case 'warning':
      return Notification.warning({
        ...options,
      })
    case 'error':
      return Notification.error({
        ...options,
      })
  }
}
</script>
