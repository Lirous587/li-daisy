<template>
  <div class="flex flex-col gap-y-5 w-auto">
    <p class="mx-auto">无背景信息条</p>
    <div class="flex gap-x-3 flex-nowrap mx-auto">
      <button class="li-btn" @click="toastFunc('primary', true)">primary</button>
      <button class="li-btn" @click="toastFunc('info', true)">info</button>
      <button class="li-btn" @click="toastFunc('success', true)">success</button>
      <button class="li-btn" @click="toastFunc('warning', true)">warn</button>
      <button class="li-btn" @click="toastFunc('error', true)">error</button>
    </div>
    <p class="mx-auto text-primary">有背景信息条</p>
    <div class="flex gap-x-3 flex-nowrap mx-auto">
      <button class="li-btn li-btn-primary" @click="toastFunc('primary')">primary</button>
      <button class="li-btn li-btn-info" @click="toastFunc('info')">info</button>
      <button class="li-btn li-btn-success" @click="toastFunc('success')">success</button>
      <button class="li-btn li-btn-warning" @click="toastFunc('warning')">warn</button>
      <button class="li-btn li-btn-error" @click="toastFunc('error')">error</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Message, type MessageType } from 'li-daisy'

const toastFunc = (type: MessageType, plain?: boolean) => {
  const options = {
    plain: false,
  }
  if (plain) {
    options.plain = true
  }

  switch (type) {
    case 'primary':
      return Message.primary(`这是一条 ${type} 消息`, {
        ...options,
      })
    case 'info':
      return Message.info(`这是一条 ${type} 消息`, {
        ...options,
      })
    case 'success':
      return Message.success(`这是一条 ${type} 消息`, {
        ...options,
      })
    case 'warning':
      return Message.warning(`这是一条 ${type} 消息`, {
        ...options,
      })
    case 'error':
      return Message.error(`这是一条 ${type} 消息`, {
        ...options,
      })
  }
}
</script>
