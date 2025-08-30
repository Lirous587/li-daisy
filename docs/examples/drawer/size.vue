<template>
  <Drawer
    title="抽屉标题"
    direction="ltr"
    size="w-[80vw] min-w-[200px] md:w-[60vw] md:max-w-[400px] lg:w-[50vw] lg:max-w-[600px]"
  >
    <template #trigger>
      <div class="btn btn-primary">打开动态drawer</div>
    </template>
    <template #content>
      <p class="font-bold">调整屏幕大小，观察drawer宽度</p>
    </template>
  </Drawer>
</template>

<script setup lang="ts">
import { Drawer } from 'li-daisy'
</script>
