<template>
  <div class="w-full flex justify-between">
    <Popover trigger="hover" :z-index="100">
      <template #trigger>
        <button class="btn btn-primary">hover</button>
      </template>
      <template #content>
        <div class="bg-base-100 p-4 rounded-lg shadow-lg max-w-xs">
          <h3 class="font-semibold mb-2">提示信息</h3>
          <p class="text-sm text-base-content/70">这是一个简单的提示内容，当鼠标悬停时显示。</p>
        </div>
      </template>
    </Popover>
    <Popover trigger="click" :z-index="100">
      <template #trigger>
        <button class="btn btn-primary">click</button>
      </template>
      <template #content>
        <div class="bg-base-100 p-3 rounded-lg shadow-lg">
          <div class="space-y-2">
            <div class="btn btn-sm w-full justify-start">编辑</div>
            <div class="btn btn-sm w-full justify-start">分享</div>
            <div class="btn btn-sm w-full justify-start">删除</div>
          </div>
        </div>
      </template>
    </Popover>
  </div>
</template>

<script setup lang="ts">
import { Popover } from 'li-daisy'
</script>
