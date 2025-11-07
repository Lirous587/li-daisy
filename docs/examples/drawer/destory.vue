<template>
  <div class="flex flex-col gap-y-4">
    <!-- 会卸载内容的弹窗 -->
    <Drawer :destroy-on-close="true">
      <template #trigger>
        <div class="li-btn">打开弹窗（卸载内容）</div>
      </template>

      <template #body>
        <h3 class="font-bold text-lg">关闭时卸载组件</h3>
        <p class="py-4">弹窗关闭后，内部内容会被卸载，重新打开会重新挂载。</p>
        <Count />
      </template>
    </Drawer>

    <!-- 不会卸载内容的弹窗 -->
    <Drawer>
      <template #trigger>
        <div class="li-btn">打开弹窗（保留内容）</div>
      </template>
      <template #body>
        <h3 class="font-bold text-lg">关闭时不卸载组件</h3>
        <p class="py-4">弹窗关闭后，内部内容不会被卸载，重新打开会保留上次状态。</p>
        <Count />
      </template>
    </Drawer>
  </div>
</template>

<script setup lang="ts">
import { Drawer } from 'li-daisy'

import Count from '../demo/Count.vue'
</script>
