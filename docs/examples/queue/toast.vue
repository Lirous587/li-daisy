<template>
  <div class="bg-base-100 shadow-lg rounded-xl border border-base-100 overflow-hidden">
    <!-- 顶部彩色条 -->
    <div class="h-1 bg-gradient-to-r from-primary to-secondary"></div>

    <!-- 主要内容 -->
    <div class="p-4">
      <div class="flex items-start space-x-3">
        <!-- 图标 -->
        <div class="shrink-0 text-primary">
          <BellAlertIcon class="w-5 h-5" />
        </div>

        <!-- 文本内容 -->
        <div class="flex-1 min-w-25 whitespace-nowrap">
          <h3 class="text-sm font-medium text-gray-900">{{ props.title }}</h3>
          <p class="text-sm text-gray-500 mt-1">{{ props.message }}</p>
        </div>

        <!-- 关闭按钮 -->
        <div class="shrink-0">
          <XMarkIcon class="w-5 h-5 hover:cursor-pointer" @click="props.close()" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { QueueItemRef } from 'li-daisy'
import { BellAlertIcon, XMarkIcon } from '@heroicons/vue/24/outline'

export interface NotificationProps {
  title?: string
  message?: string
}

const props = defineProps<QueueItemRef & NotificationProps>()
</script>
