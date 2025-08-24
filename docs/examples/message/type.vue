<template>
  <div class="flex flex-col gap-y-5 w-auto">
    <p class="mx-auto">无背景信息条</p>
    <div class="flex gap-x-3 flex-nowrap mx-auto">
      <button class="btn" @click="toastFunc('primary', true)">primary</button>
      <button class="btn" @click="toastFunc('info', true)">info</button>
      <button class="btn" @click="toastFunc('success', true)">success</button>
      <button class="btn" @click="toastFunc('warning', true)">warn</button>
      <button class="btn" @click="toastFunc('error', true)">error</button>
    </div>
    <p class="mx-auto text-primary">有背景信息条</p>
    <div class="flex gap-x-3 flex-nowrap mx-auto">
      <button class="btn btn-primary" @click="toastFunc('primary')">primary</button>
      <button class="btn btn-info" @click="toastFunc('info')">info</button>
      <button class="btn btn-success" @click="toastFunc('success')">success</button>
      <button class="btn btn-warning" @click="toastFunc('warning')">warn</button>
      <button class="btn btn-error" @click="toastFunc('error')">error</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Message, type MessageType } from 'li-daisy'

const toastFunc = (type: MessageType, plain?: boolean) => {
  const options = {
    message: `这是一条 ${type} 消息`,
    plain: false,
  }
  if (plain) {
    options.plain = true
  }

  switch (type) {
    case 'primary':
      return Message.primary({
        ...options,
      })
    case 'info':
      return Message.info({
        ...options,
      })
    case 'success':
      return Message.success({
        ...options,
      })
    case 'warning':
      return Message.warning({
        ...options,
      })
    case 'error':
      return Message.error({
        ...options,
      })
  }
}
</script>
