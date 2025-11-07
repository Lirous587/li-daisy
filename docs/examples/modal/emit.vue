<template>
  <div>
    <Modal ref="modalRef" @open="handleOpen" @close="handleClose">
      <template #body>
        <h3 class="font-bold text-lg">emit例子</h3>
        <p class="py-4">emit例子</p>
      </template>
    </Modal>

    <button class="li-btn" @click="handleOpenModal">emit例子</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Message, Modal, type ModalRef } from 'li-daisy'

const modalRef = ref<ModalRef>()

const handleOpenModal = () => {
  modalRef.value?.open()
}

const handleOpen = () => {
  Message.success('modal被打开了')
}

const handleClose = () => {
  Message.warning('modal被关闭了')
}
</script>
