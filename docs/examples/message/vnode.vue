<template>
  <div class="space-x-3">
    <button class="btn btn-primary btn-dash" @click="vnodeNotification">vnode消息</button>
  </div>
</template>

<script setup lang="ts">
import { h } from 'vue'
import { Message } from 'li-daisy'

const vnodeNotification = () => {
  Message.info(h('span', { style: 'color: #16a34a;' }, '这是VNode消息内容'))
}
</script>
