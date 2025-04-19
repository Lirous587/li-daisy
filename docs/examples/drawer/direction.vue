<template>
  <div>
    <Drawer ref="drawerRef" title="抽屉标题" direction="rtl">
      <p class="font-bold">这是抽屉内容</p>
    </Drawer>
    <div class="btn btn-primary" @click="handleOpenDrawer">从右到左打开</div>
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
