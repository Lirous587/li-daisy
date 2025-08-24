<template>
  <div
    class="relative flex items-center gap-x-2 border border-base-300 py-1.5 px-2 rounded-sm bg-base-100 overflow-hidden"
  >
    <!-- icon -->
    <div class="flex h-5 items-center">
      <component :is="iconComponent" class="w-5 h-5" :class="textColorClass"></component>
    </div>

    <!-- content -->
    <div class="flex-1 text-sm" :class="textColorClass">
      <template v-if="typeof props.message === 'string'">
        {{ props.message }}
      </template>
      <template v-else-if="isVNode(props.message)">
        <component :is="props.message" />
      </template>
    </div>

    <!-- close-icon -->
    <div class="flex items-center h-4">
      <XMarkIcon
        v-if="props.showCloseIcon"
        @click="emit('close')"
        class="ml-auto shrink-0 w-4 h-4 text-base-content hover:cursor-pointer opacity-70"
      />
    </div>

    <!-- 背景层 -->
    <div class="absolute inset-0 opacity-10" :class="bgColorClass" v-if="!props.plain"></div>
  </div>
</template>

<script lang="ts" setup>
import {
  XMarkIcon,
  CheckBadgeIcon, //primary
  InformationCircleIcon, //info
  CheckCircleIcon, //success
  ExclamationCircleIcon, //warning
  ExclamationTriangleIcon, // error
} from '@heroicons/vue/24/outline'

import { computed, isVNode } from 'vue'

import type { MessageProps } from './types'

const props = withDefaults(defineProps<MessageProps>(), {
  type: 'info',
  showCloseIcon: true,
  plain: false,
})

// 添加emit以通知插件Notification已关闭
const emit = defineEmits(['close'])

const textColorClass = computed(() => {
  switch (props.type) {
    case 'primary':
      return 'text-primary'
    case 'info':
      return 'text-info'
    case 'success':
      return 'text-success'
    case 'warning':
      return 'text-warning'
    case 'error':
      return 'text-error'
    default:
      return 'text-info'
  }
})

const bgColorClass = computed(() => {
  switch (props.type) {
    case 'primary':
      return 'bg-primary'
    case 'info':
      return 'bg-info'
    case 'success':
      return 'bg-success'
    case 'warning':
      return 'bg-warning'
    case 'error':
      return 'bg-error'
    default:
      return 'bg-info'
  }
})

// 根据类型返回对应的图标组件
const iconComponent = computed(() => {
  switch (props.type) {
    case 'primary':
      return CheckBadgeIcon
    case 'info':
      return InformationCircleIcon
    case 'success':
      return CheckCircleIcon
    case 'warning':
      return ExclamationCircleIcon
    case 'error':
      return ExclamationTriangleIcon
    default:
      return InformationCircleIcon
  }
})
</script>
