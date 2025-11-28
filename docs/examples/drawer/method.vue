<template>
  <div class="flex flex-col gap-y-4">
    <Drawer title="抽屉标题">
      <template #trigger>
        <div class="btn">点击trigger打开</div>
      </template>
      <template #body>
        <p>这是点击trigger插槽打开的抽屉</p>
        <div class="h-screen bg-base-300">这是一个较高的元素</div>
      </template>
    </Drawer>

    <div class="btn" @click="handleOpenDrawer">使用 open 方法打开</div>
    <Drawer ref="drawerRef" title="抽屉标题">
      <template #body>
        <p>这是使用open方法打开的抽屉</p>
        <div class="h-screen bg-base-300">这是一个较高的元素</div>
      </template>
    </Drawer>
  </div>
</template>

<script setup lang="ts">
import { Drawer } from 'li-daisy'

import type { DrawerRef } from 'li-daisy'
import { ref } from 'vue'

const drawerRef = ref<DrawerRef>()
const handleOpenDrawer = () => {
  drawerRef.value?.open()
}
</script>
