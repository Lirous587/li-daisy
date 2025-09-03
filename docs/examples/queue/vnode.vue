<template>
  <div class="p-4 space-y-4 mx-auto min-w-md">
    <div class="grid grid-rows-2 grid-cols-3 gap-5">
      <button class="btn btn-primary" @click="showNotification('top-start')">Top Start</button>
      <button class="btn btn-secondary" @click="showNotification('top-center')">Top Center</button>
      <button class="btn btn-neutral" @click="showNotification('top-end')">Top End</button>
      <button class="btn btn-success" @click="showNotification('bottom-start')">
        Bottom Start
      </button>
      <div class="select-none" tabindex="0"></div>
      <button class="btn btn-info" @click="showNotification('bottom-end')">Bottom End</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Queue, type QueuePosition } from 'li-daisy'
import { h } from 'vue'

const showNotification = (position: QueuePosition) => {
  const hVnode = h(
    'div',
    { class: 'space-y-2 bg-base-100 p-4 border-2 border-base-300 rounded-md shadow-md' },
    [
      h('div', { class: 'flex items-center space-x-2' }, [
        h('span', { class: 'font-medium text-primary' }, '版本 v1.5.2 已发布'),
      ]),
      h('p', { class: 'text-sm text-secondary' }, '本次更新包含以下新功能：'),
      h('ul', { class: 'text-sm text-base list-disc list-inside space-y-1' }, [
        h('li', null, '使用queue组件重构新版toast'),
        h('li', null, '修复已知 Bug'),
      ]),
    ],
  )

  Queue.addVnode(hVnode, {
    position: position,
    onClose: () => console.log('close callback'),
  })
}
</script>
