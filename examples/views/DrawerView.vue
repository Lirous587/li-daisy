<template>
  <div class="relative h-[400px] w-[400px] bg-primary">
    <Drawer
      ref="drawerRef"
      title="抽屉标题"
      size="40%"
      direction="ltr"
      :close-on-click-modal="false"
    >
      这是抽屉内容
    </Drawer>
    <button class="btn" @click="handleOpenDrawer">打开抽屉</button>
  </div>
</template>

<script setup lang="ts">
import Drawer, { type DrawerRef } from '@/index'

import { ref } from 'vue'

const drawerRef = ref<DrawerRef>()
const handleOpenDrawer = () => {
  drawerRef.value?.open()
}
</script>
