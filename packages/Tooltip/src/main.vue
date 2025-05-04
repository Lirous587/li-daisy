<template>
  <div class="w-full" :class="wrapperClasses" :data-tip="tooltipContent">
    <div ref="contentRef" class="overflow-hidden text-ellipsis whitespace-nowrap">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUpdated, nextTick, watch } from 'vue'
import { type TooltipProps } from './types'

const props = withDefaults(defineProps<TooltipProps>(), {
  position: 'top',
})

const positionClass = computed(() => {
  switch (props.position) {
    case 'top':
      return 'tooltip-top'
    case 'bottom':
      return 'tooltip-bottom'
    case 'left':
      return 'tooltip-left'
    case 'right':
      return 'tooltip-right'
    default:
      return 'tooltip-top'
  }
})

const colorClass = computed(() => {
  switch (props.color) {
    case 'neutral':
      return 'tooltip-neutral'
    case 'primary':
      return 'tooltip-primary'
    case 'secondary':
      return 'tooltip-secondary'
    case 'accent':
      return 'tooltip-accent'
    case 'info':
      return 'tooltip-info'
    case 'success':
      return 'tooltip-success'
    case 'warning':
      return 'tooltip-warning'
    case 'error':
      return 'tooltip-error'
    default:
      return ''
  }
})

// --- 溢出检测逻辑 ---
const contentRef = ref<HTMLElement | null>(null)
const isOverflowing = ref(false)

const checkOverflow = () => {
  const el = contentRef.value
  if (el) {
    // 使用 nextTick 确保 DOM 更新和样式应用后再检查
    nextTick(() => {
      isOverflowing.value = el.scrollWidth > el.clientWidth - 0.1
    })
  } else {
    isOverflowing.value = false
  }
}

// 在挂载和更新后检查溢出
onMounted(checkOverflow)
onUpdated(checkOverflow)

// 如果 props.tip 变化也可能需要重新检查（取决于你的具体逻辑）
watch(() => props.content, checkOverflow)

// 外层 div 的 class，仅在需要显示 tooltip 时添加相关类
const wrapperClasses = computed(() => {
  if (props.open || isOverflowing.value) {
    const classes = ['tooltip'] // 基础类
    classes.push(positionClass.value)
    if (colorClass.value) {
      classes.push(colorClass.value)
    }
    if (props.open) {
      classes.push('tooltip-open')
    }
    return classes
  }
  // 如果不显示 tooltip，则不添加 tooltip 相关类
  return []
})

// Tooltip 的内容，仅在需要显示时提供
const tooltipContent = computed(() => {
  // 仅当强制打开或内容溢出时，才返回 tip 内容
  if (props.open || isOverflowing.value) {
    return props.content
  }
  // 否则返回 undefined，这样 data-tip 属性就不会被渲染
  return undefined
})
</script>
