<template>
  <div>
    <Drawer ref="drawerRef" title="抽屉标题" size="40%" direction="ltr" :show-close-icon="true">
      这是抽屉内容
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
