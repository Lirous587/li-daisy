<template>
  <div :class="wrapperClasses" :data-tip="props.content">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
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

const wrapperClasses = computed(() => {
  const classes = ['tooltip'] // 基础类
  classes.push(positionClass.value)
  if (colorClass.value) {
    classes.push(colorClass.value)
  }
  if (props.open) {
    classes.push('tooltip-open')
  }
  return classes
})
</script>
