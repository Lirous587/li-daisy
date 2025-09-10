<template>
  <div class="flex flex-col items-center gap-y-6 p-8 min-w-md">
    <!-- 顶部位置组 -->
    <div class="flex items-center gap-x-4">
      <Popover
        v-for="position in topPositions"
        :key="position"
        :position="position"
        trigger="click"
      >
        <template #trigger>
          <div class="li-btn li-btn-sm min-w-24">{{ position }}</div>
        </template>
        <template #content>
          <Card />
        </template>
      </Popover>
    </div>

    <!-- 中间位置组 -->
    <div class="flex items-center justify-between w-full">
      <!-- 左侧组 -->
      <div class="flex flex-col gap-y-3">
        <Popover
          v-for="position in leftPositions"
          :key="position"
          :position="position"
          trigger="click"
          :z-index="999"
        >
          <template #trigger>
            <div class="li-btn li-btn-sm min-w-24">{{ position }}</div>
          </template>
          <template #content>
            <Card />
          </template>
        </Popover>
      </div>

      <!-- 中心说明 -->
      <div class="flex items-center justify-center">
        <div class="badge badge-outline">Popover 位置示例</div>
      </div>

      <!-- 右侧组 -->
      <div class="flex flex-col gap-y-3">
        <Popover
          v-for="position in rightPositions"
          :key="position"
          :position="position"
          trigger="click"
        >
          <template #trigger>
            <div class="li-btn li-btn-sm min-w-24">{{ position }}</div>
          </template>
          <template #content>
            <Card />
          </template>
        </Popover>
      </div>
    </div>

    <!-- 底部位置组 -->
    <div class="flex items-center gap-x-4">
      <Popover
        v-for="position in bottomPositions"
        :key="position"
        :position="position"
        trigger="click"
      >
        <template #trigger>
          <div class="li-btn li-btn-sm min-w-24">{{ position }}</div>
        </template>
        <template #content>
          <Card />
        </template>
      </Popover>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Popover, type PopoverPositon } from 'li-daisy'
import Card from '../demo/Card.vue'

const topPositions: Array<PopoverPositon> = ['top-start', 'top', 'top-end']
const leftPositions: Array<PopoverPositon> = ['left-start', 'left', 'left-end']
const rightPositions: Array<PopoverPositon> = ['right-start', 'right', 'right-end']
const bottomPositions: Array<PopoverPositon> = ['bottom-start', 'bottom', 'bottom-end']
</script>
