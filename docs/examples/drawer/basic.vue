<template>
  <div class="space-y-4">
    <Drawer ref="drawerRef" title="抽屉标题">
      <p class="font-bold">这是抽屉内容1</p>
    </Drawer>
    <div class="btn btn-primary" @click="handleOpenDrawer">打开抽屉1</div>

    <Drawer title="抽屉标题">
      <div class="btn btn-primary">打开抽屉2</div>
      <template #content>
        <p class="font-bold">这是抽屉内容2</p>
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
