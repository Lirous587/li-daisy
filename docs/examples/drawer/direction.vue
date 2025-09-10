<template>
  <div class="flex justify-between w-full gap-x-5">
    <Drawer
      v-for="direction in directions"
      :key="direction"
      :title="'打开方向:' + direction"
      :direction="direction"
      class="my-3"
    >
      <template #trigger>
        <div class="li-btn li-btn-primary">打开方向: {{ direction }}</div>
      </template>
      <template #body>
        <p>打开方向: {{ direction }}</p>
      </template>
    </Drawer>
  </div>
</template>

<script setup lang="ts">
import { Drawer } from 'li-daisy'
import type { DrawerDirection } from 'li-daisy'
import { ref } from 'vue'

const directions = ref<DrawerDirection[]>(['ltr', 'rtl'])
</script>
