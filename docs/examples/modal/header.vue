<template>
  <div>
    <Modal ref="modalRef" :close-on-click-modal="false" title="title">
      <template #header="{ close }">
        <div class="flex w-full justify-between border-b border-b-base-300 p-3">
          <h2 class="font-bold">自定义header</h2>
          <div class="li-btn li-btn-primary li-btn-circle li-btn-xs text-lg" @click="close">×</div>
        </div>
      </template>
      <template #body>
        <p>这是body</p>
      </template>
    </Modal>

    <button class="li-btn li-btn-primary" @click="handleOpenModal">自定义header</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Modal, type ModalRef } from 'li-daisy'

const modalRef = ref<ModalRef>()

const handleOpenModal = () => {
  modalRef.value?.open()
}
</script>
