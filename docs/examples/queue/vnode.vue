<template>
  <div class="p-4 space-y-4 mx-auto min-w-md">
    <div class="grid grid-rows-2 grid-cols-3 gap-5">
      <button class="btn btn-primary" @click="showToast('top-start')">Top Start</button>
      <button class="btn btn-secondary" @click="showToast('top-center')">Top Center</button>
      <button class="btn btn-neutral" @click="showToast('top-end')">Top End</button>
      <button class="btn btn-success" @click="showToast('bottom-start')">Bottom Start</button>
      <div class="select-none" tabindex="0"></div>
      <button class="btn btn-info" @click="showToast('bottom-end')">Bottom End</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { queue, type QueuePosition } from 'li-daisy'
import { h } from 'vue'

import component from './toast.vue'

const showToast = (position: QueuePosition) => {
  const hVnode = h(component, {
    title: '操作成功',
    message: `消息显示在 ${position} 位置`,
  } as any)

  queue.addVnode(hVnode, {
    position: position,
    onClose: () => console.log('close callback'),
  })
}
</script>
