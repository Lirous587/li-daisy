<template>
  <div class="flex justify-between w-full gap-x-5">
    <Drawer title="抽屉标题" show-close-icon>
      <template #trigger>
        <div class="li-btn">该抽屉有close图标</div>
      </template>
      <template #body>
        <p>该抽屉有close图标</p>
      </template>
    </Drawer>

    <Drawer title="抽屉标题" :show-close-icon="false">
      <template #trigger>
        <div class="li-btn">该抽屉无close图标</div>
      </template>
      <template #body>
        <p>该抽屉无close图标</p>
      </template>
    </Drawer>
  </div>
</template>

<script setup lang="ts">
import { Drawer } from 'li-daisy'
</script>
