<template>
  <div class="p-4 space-y-4">
    <h2>Queue 队列示例</h2>

    <div class="flex gap-2">
      <button class="btn btn-primary" @click="showToast('top-start')">Top Start</button>
      <button class="btn btn-primary" @click="showToast('top-center')">Top Center</button>
      <button class="btn btn-primary" @click="showToast('top-end')">Top End</button>
      <button class="btn btn-secondary" @click="showToast('bottom-start')">Bottom Start</button>
      <button class="btn btn-secondary" @click="showToast('bottom-end')">Bottom End</button>
    </div>

    <button class="btn btn-error" @click="clearAll">清空所有</button>
  </div>
</template>

<script setup lang="ts">
import { queue } from '../../../packages'
import type { QueuePosition } from '../../../packages'

import component from './component.vue'

let counter = 0

const showToast = (position: QueuePosition) => {
  counter++
  queue.add(component, {
    position,
    duration: 2000,
  })
}

queue.setStaggerDelay(2000)

const clearAll = () => {
  queue.clear()
}
</script>
