<template>
  <div>
    <Modal ref="modalRef" close-icon>
      <h3 class="font-bold text-lg">Hello!</h3>
      <p class="py-4">This is the modal content.</p>
    </Modal>

    <button class="btn btn-primary" @click="handleOpenModal">打开modal</button>
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
