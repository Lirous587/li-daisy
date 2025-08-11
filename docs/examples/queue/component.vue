<template>
  <div class="bg-white shadow-lg rounded-xl border border-gray-100 overflow-hidden max-w-xs">
    <!-- 顶部彩色条 -->
    <div class="h-1 bg-gradient-to-r from-secondary to-primary"></div>

    <!-- 主要内容 -->
    <div class="p-4">
      <div class="flex items-start space-x-3">
        <!-- 图标 -->
        <div class="flex-shrink-0">
          <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <svg class="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
        </div>

        <!-- 文本内容 -->
        <div class="flex-1 min-w-0">
          <h3 class="text-sm font-medium text-gray-900">通知消息</h3>
          <p class="text-sm text-gray-500 mt-1">这是一段提示消息，用来展示队列组件的效果</p>
        </div>

        <!-- 关闭按钮 -->
        <div class="flex-shrink-0">
          <button
            @click="props.close()"
            class="w-6 h-6 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors group"
          >
            <svg
              class="w-4 h-4 text-gray-400 group-hover:text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { QueueItemRef } from '../../../packages'

const props = defineProps<QueueItemRef>()
</script>
