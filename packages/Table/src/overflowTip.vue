<template>
  <div class="w-full" :class="wrapperClasses" :data-tip="tooltipContent">
    <div ref="contentRef" class="overflow-hidden text-ellipsis whitespace-nowrap">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUpdated, nextTick, watch } from 'vue'
import Popover from '../../Popover'

interface TooltipProps {
  content: any
}

const props = defineProps<TooltipProps>()

// --- 溢出检测逻辑 ---
const contentRef = ref<HTMLElement | null>(null)
const isOverflowing = ref(false)

const checkOverflow = () => {
  const el = contentRef.value
  if (el) {
    // 使用 nextTick 确保 DOM 更新和样式应用后再检查
    nextTick(() => {
      isOverflowing.value = el.scrollWidth > el.clientWidth
    })
  } else {
    isOverflowing.value = false
  }
}

// 在挂载和更新后检查溢出
onMounted(checkOverflow)
onUpdated(checkOverflow)

// 如果 props.tip 变化也可能需要重新检查
watch(() => props.content, checkOverflow)

// 外层 div 的 class，仅在需要显示 tooltip 时添加相关类
const wrapperClasses = computed(() => {
  if (isOverflowing.value) {
    const classes = ['tooltip'] // 基础类
    classes.push('tooltip-top')
    return classes
  }
  // 如果不显示 tooltip，则不添加 tooltip 相关类
  return []
})

// Tooltip 的内容，仅在需要显示时提供
const tooltipContent = computed(() => {
  if (isOverflowing.value) {
    return props.content
  }
  // 否则返回 undefined，这样 data-tip 属性就不会被渲染
  return undefined
})
</script>
