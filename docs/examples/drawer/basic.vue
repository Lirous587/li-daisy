<template>
  <div>
    <Drawer ref="drawerRef" title="抽屉标题" size="max(300px, 40%)" direction="ltr">
      <div class="btn btn-secondary">这是抽屉内容</div>
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

<script lang="ts"></script>
