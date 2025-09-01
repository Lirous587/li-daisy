<template>
  <div>
    <Modal ref="modalRef" :close-on-click-modal="false">
      <template #header="{ close }">
        <div class="flex w-full justify-between">
          <h2 class="font-bold">自定义header</h2>
          <div class="btn btn-primary btn-circle btn-xs text-lg" @click="close">×</div>
        </div>
      </template>
      <template #body>
        <p>这是body</p>
      </template>
    </Modal>

    <button class="btn btn-primary" @click="handleOpenModal">emit例子</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Message, Modal, type ModalRef } from 'li-daisy'

const modalRef = ref<ModalRef>()

const handleOpenModal = () => {
  modalRef.value?.open()
}
</script>
