<template>
  <div class="flex justify-between w-full">
    <Drawer title="抽屉标题" :close-on-click-modal="true">
      <template #trigger>
        <div class="btn btn-primary">当前点击蒙层可关闭抽屉</div>
      </template>
      <template #content>
        <p class="font-bold">当前点击蒙层可关闭抽屉</p>
      </template>
    </Drawer>

    <Drawer title="抽屉标题" :close-on-click-modal="false">
      <template #trigger>
        <div class="btn btn-primary">当前点击蒙层不可关闭抽屉</div>
      </template>
      <template #content>
        <p class="font-bold">当前点击蒙层不可关闭抽屉</p>
      </template>
    </Drawer>
  </div>
</template>

<script setup lang="ts">
import { Drawer } from 'li-daisy'
</script>
