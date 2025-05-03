<template>
  <div v-if="isVisiable" class="toast bg-white/0 rounded-md z-[999]" :class="positionClass">
    <div
      class="alert rounded-md relative overflow-hidden border-0"
      :class="[typeClass, $attrs.class]"
    >
      <component
        v-if="props.type !== 'custom'"
        :is="iconComponent"
        class="w-5 h-5 mr-2"
      ></component>
      <span v-if="!slot.default">
        {{ message }}
      </span>
      <slot></slot>
      <button v-if="props.close" class="btn btn-xs btn-ghost" @click="close">
        <XMarkIcon class="w-4 h-4" />
      </button>
      <div
        class="absolute w-full h-1 bottom-0 origin-left"
        :class="progress"
        :style="{ transform: `scaleX(${progressPercentage / 100})` }"
      ></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  XMarkIcon,
  BellIcon, //info
  CheckCircleIcon, //success
  ExclamationCircleIcon, //warning
  ExclamationTriangleIcon, // error
} from '@heroicons/vue/24/outline'

import { computed, onUnmounted, ref, useSlots } from 'vue'

import type { ToastProps } from './types'

const props = withDefaults(defineProps<ToastProps>(), {
  direction: 'top-end',
  type: 'info',
  duration: 3000,
  close: true,
})

const slot = useSlots()

// 添加emit以通知插件Toast已关闭
const emit = defineEmits(['close'])

const positionClass = computed(() => {
  switch (props.position) {
    case 'top-start':
      return 'toast-top toast-start'
    case 'top-center':
      return 'toast-top toast-center'
    case 'top-end':
      return 'toast-top toast-end'
    case 'bottom-start':
      return 'toast-bottom toast-start'
    case 'bottom-end':
      return 'toast-bottom toast-end'
    default:
      return 'toast-top toast-end'
  }
})

const typeClass = computed(() => {
  switch (props.type) {
    case 'info':
      return 'alert-info'
    case 'success':
      return 'alert-success'
    case 'warning':
      return 'alert-warning'
    case 'error':
      return 'alert-error'
    default:
      return ''
  }
})

const progress = computed(() => {
  switch (props.type) {
    case 'info':
      return 'bg-info-content/50'
    case 'success':
      return 'bg-success-content/50'
    case 'warning':
      return 'bg-warning-content/50'
    case 'error':
      return 'bg-error-content/50'
    default:
      return 'bg-base-content/50'
  }
})

// 根据类型返回对应的图标组件
const iconComponent = computed(() => {
  switch (props.type) {
    case 'info':
      return BellIcon
    case 'success':
      return CheckCircleIcon
    case 'warning':
      return ExclamationCircleIcon
    case 'error':
      return ExclamationTriangleIcon
    default:
      return BellIcon
  }
})

const isVisiable = ref(false)
const progressPercentage = ref(100)
let animationController: { cancel: () => void } | null = null

const newProgress = () => {
  let startTime = 0
  let animationFrameId: number | null = null

  // 更新函数
  const updateProgress = (timestamp: number) => {
    if (startTime === 0) {
      startTime = timestamp
    }

    // 计算已经过去的时间占总时间的比例
    const elapsed = timestamp - startTime
    const remainingPercentage = Math.max(0, 100 - (elapsed / props.duration) * 100)
    // 更新进度百分比
    progressPercentage.value = remainingPercentage

    // toast还可见并且进度还没完成，继续动画
    if (isVisiable.value && remainingPercentage > 0) {
      animationFrameId = requestAnimationFrame(updateProgress)
    } else if (isVisiable.value && remainingPercentage <= 0) {
      // 进度条走完 关闭动画
      close()
    }
  }

  // 开始动画
  animationFrameId = requestAnimationFrame(updateProgress)

  // 返回控制器对象
  return {
    cancel: () => {
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId)
        animationFrameId = null
      }
    },
  }
}

const show = () => {
  if (animationController) {
    animationController.cancel()
    animationController = null
  }
  // 重置进度条
  progressPercentage.value = 100

  // 显示Toast
  isVisiable.value = true

  animationController = newProgress()
}

const close = () => {
  isVisiable.value = false

  // 取消进度条动画
  if (animationController) {
    animationController.cancel()
    animationController = null
  }

  emit('close')
}

// 组件卸载时清理资源
onUnmounted(() => {
  if (animationController) {
    animationController.cancel()
  }
})

defineExpose({
  show,
  close,
})
</script>
