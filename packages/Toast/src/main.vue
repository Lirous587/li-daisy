<template>
  <div
    class="flex flex-col justify-between px-4 py-3 border border-base-300 shadow-lg rounded-lg bg-base-100 min-w-xs min-h-23"
  >
    <div class="flex w-full items-center gap-x-2">
      <div class="flex w-full items-center gap-x-2 flex-1">
        <component :is="iconComponent" class="w-6 h-6" :class="iconColorClass"></component>
        <h3 class="text-lg font-bold">{{ props.title }}</h3>
      </div>
      <XMarkIcon
        v-if="props.showCloseIcon"
        @click="emit('close')"
        class="shrink-0 w-5 h-5 text-base-content hover:cursor-pointer"
      />
    </div>

    <div class="mt-2">
      <template v-if="typeof props.message === 'string'">
        {{ props.message }}
      </template>
      <template v-else-if="isVNode(props.message)">
        <component :is="props.message" />
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  XMarkIcon,
  InformationCircleIcon, //info
  CheckCircleIcon, //success
  ExclamationCircleIcon, //warning
  ExclamationTriangleIcon, // error
} from '@heroicons/vue/24/outline'

import { computed, isVNode } from 'vue'

import type { ToastProps } from './types'

const props = withDefaults(defineProps<ToastProps>(), {
  type: 'info',
  showCloseIcon: true,
})

// 添加emit以通知插件Toast已关闭
const emit = defineEmits(['close'])

const iconColorClass = computed(() => {
  switch (props.type) {
    case 'info':
      return 'text-info'
    case 'success':
      return 'text-success'
    case 'warn':
      return 'text-warn'
    case 'error':
      return 'text-error'
    default:
      return ''
  }
})

// 根据类型返回对应的图标组件
const iconComponent = computed(() => {
  switch (props.type) {
    case 'info':
      return InformationCircleIcon
    case 'success':
      return CheckCircleIcon
    case 'warn':
      return ExclamationCircleIcon
    case 'error':
      return ExclamationTriangleIcon
    default:
      return InformationCircleIcon
  }
})
</script>
