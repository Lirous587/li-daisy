<template>
  <div class="p-4 space-y-4 mx-auto min-w-md">
    <div class="grid grid-rows-2 grid-cols-3 gap-5">
      <button class="li-btn li-btn-primary" @click="showNotification('top-start')">
        Top Start
      </button>
      <button class="li-btn li-btn-secondary" @click="showNotification('top-center')">
        Top Center
      </button>
      <button class="li-btn li-btn-neutral" @click="showNotification('top-end')">Top End</button>
      <button class="li-btn li-btn-success" @click="showNotification('bottom-start')">
        Bottom Start
      </button>
      <div class="select-none" tabindex="0"></div>
      <button class="li-btn li-btn-info" @click="showNotification('bottom-end')">Bottom End</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Queue, type QueuePosition } from 'li-daisy'

import component from './toast.vue'
import type { ToastProps } from './toast.vue'

const showNotification = (position: QueuePosition) => {
  Queue.addComponent(
    component,
    {
      title: '操作成功',
      message: `消息显示在 ${position} 位置`,
    } as ToastProps,
    {
      position: position,
      autoClose: false,
      onClose: () => console.log('close callback'),
    }
  )
}
</script>
