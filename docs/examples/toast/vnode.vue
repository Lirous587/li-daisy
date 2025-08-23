<template>
  <div class="space-x-3">
    <button class="btn btn-primary btn-dash" @click="vnodeToast">vnode消息</button>
  </div>
</template>

<script setup lang="ts">
import { h } from 'vue'
import { Toast } from 'li-daisy'

const vnodeToast = () => {
  Toast.info({
    title: '系统更新通知',
    message: h('div', { class: 'space-y-2' }, [
      h('div', { class: 'flex items-center space-x-2' }, [
        h('span', { class: 'font-medium text-primary' }, '版本 v1.5.2 已发布'),
      ]),
      h('p', { class: 'text-sm text-secondary' }, '本次更新包含以下新功能：'),
      h('ul', { class: 'text-sm text-base list-disc list-inside space-y-1' }, [
        h('li', null, '使用queue组件重构新版toast'),
        h('li', null, '修复已知 Bug'),
      ]),
    ]),
    showCloseIcon: false,
    duration: 5000,
  })
}
</script>
