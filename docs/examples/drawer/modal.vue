<template>
  <div class="flex justify-between w-full gap-x-5">
    <Drawer title="抽屉标题" :close-on-click-modal="true">
      <template #trigger>
        <div class="li-btn">点击蒙层可关闭</div>
      </template>
      <template #body>
        <p>点击蒙层可关闭</p>
      </template>
    </Drawer>

    <Drawer title="抽屉标题" :close-on-click-modal="false">
      <template #trigger>
        <div class="li-btn">点击蒙层不可关闭</div>
      </template>
      <template #body>
        <p>点击蒙层不可关闭</p>
      </template>
    </Drawer>
  </div>
</template>

<script setup lang="ts">
import { Drawer } from 'li-daisy'
</script>
