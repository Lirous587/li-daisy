<template>
  <div>
    <Drawer :close-on-click-modal="false">
      <template #trigger>
        <div class="btn btn-primary">打开自定义header抽屉</div>
      </template>
      <template #header="{ close }">
        <div class="w-full flex justify-between border-b border-base-300 p-3">
          <h2 class="font-bold text-primary">这是自定义header</h2>
          <button class="btn btn-xs btn-neutral" @click="close">关闭</button>
        </div>
      </template>
      <template #body>
        <p>自定义header之后 title属性将不会生效</p>
      </template>
    </Drawer>
  </div>
</template>

<script setup lang="ts">
import { Drawer } from 'li-daisy'
</script>
