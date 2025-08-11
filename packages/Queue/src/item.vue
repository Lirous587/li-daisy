<template>
  <div class="pointer-events-auto">
    <!-- 如果是组件或VNode，渲染并传递close方法 -->
    <component :is="props.content" :close="handleClose" @close="handleClose" />
  </div>
</template>

<script setup lang="ts">
import type { Component } from 'vue'

const props = defineProps<{
  content: Component
}>()

const emit = defineEmits<{
  close: []
}>()

const handleClose = () => {
  emit('close')
}
</script>
