<template>
  <div class="flex gap-x-3 flex-nowrap">
    <button class="btn" @click="toastFunc('info')">info</button>
    <button class="btn" @click="toastFunc('success')">success</button>
    <button class="btn" @click="toastFunc('warn')">warn</button>
    <button class="btn" @click="toastFunc('error')">error</button>
  </div>
</template>

<script setup lang="ts">
import { toast, type ToastType } from 'li-daisy'

const toastFunc = (type: ToastType) => {
  const options = {
    title: '这是消息标题',
    message: `这是一条 ${type} 消息`,
  }

  switch (type) {
    case 'info':
      return toast.info({
        ...options,
      })
    case 'success':
      return toast.success({
        ...options,
      })
    case 'warn':
      return toast.warn({
        ...options,
      })
    case 'error':
      return toast.error({
        ...options,
      })
  }
}
</script>
