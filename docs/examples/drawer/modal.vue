<template>
  <div>
    <Drawer ref="drawerRef" title="抽屉标题" :close-on-click-modal="false">
      <p class="font-bold">这是抽屉内容</p>
    </Drawer>
    <div class="btn btn-primary" @click="handleOpenDrawer">打开抽屉</div>
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
