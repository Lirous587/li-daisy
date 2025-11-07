<template>
  <div class="flex flex-col gap-y-4">
    <Modal>
      <template #trigger>
        <div class="li-btn">点击trigger插槽打开</div>
      </template>
      <template #body>
        <p>这是点击trigger插槽打开的对话框</p>
      </template>
    </Modal>

    <div class="li-btn" @click="handleOpenModal">使用 open 方法打开</div>

    <Modal ref="drawerRef">
      <template #body>
        <p>这是使用open方法打开的对话框</p>
      </template>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { Modal } from 'li-daisy'
import type { ModalRef } from 'li-daisy'
import { ref } from 'vue'

const drawerRef = ref<ModalRef>()
const handleOpenModal = () => {
  drawerRef.value?.open()
}
</script>
