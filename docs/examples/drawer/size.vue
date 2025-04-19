<template>
  <div>
    <Drawer
      ref="drawerRef"
      title="抽屉标题"
      direction="ltr"
      size="w-[80vw] min-w-[200px] md:w-[60vw] md:max-w-[400px] lg:w-[50vw] lg:max-w-[600px]"
    >
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
