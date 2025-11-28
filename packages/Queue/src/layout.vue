<template>
  <div v-if="hasItem" class="fixed inset-0 pointer-events-none z-9999 vp-raw">
    <!-- 左上角 -->
    <QueuePositionContainer position="top-start" :items="leftTopItems" @remove="handleRemove" />

    <!-- 顶部中央 -->
    <QueuePositionContainer position="top-center" :items="topCenterItems" @remove="handleRemove" />

    <!-- 右上角 -->
    <QueuePositionContainer position="top-end" :items="rightTopItems" @remove="handleRemove" />

    <!-- 左下角 -->
    <QueuePositionContainer
      position="bottom-start"
      :items="leftBottomItems"
      @remove="handleRemove"
    />

    <!-- 右下角 -->
    <QueuePositionContainer
      position="bottom-end"
      :items="rightBottomItems"
      @remove="handleRemove"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { QueueLayoutProps } from './types'
import QueuePositionContainer from './position-container.vue'

const props = withDefaults(defineProps<QueueLayoutProps>(), {})

// 各位置的消息列表
const leftTopItems = computed(() => props.queueMap['top-start'] || [])
const topCenterItems = computed(() => props.queueMap['top-center'] || [])
const rightTopItems = computed(() => props.queueMap['top-end'] || [])
const leftBottomItems = computed(() => props.queueMap['bottom-start'] || [])
const rightBottomItems = computed(() => props.queueMap['bottom-end'] || [])

const hasItem = computed(() => {
  return (
    leftTopItems.value.length ||
    topCenterItems.value.length ||
    rightTopItems.value.length ||
    leftBottomItems.value.length ||
    rightBottomItems.value.length
  )
})

const emit = defineEmits<{
  remove: [id: string]
}>()

const handleRemove = (id: string) => {
  emit('remove', id)
}
</script>
