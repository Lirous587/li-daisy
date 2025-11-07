<template>
  <div>
    <Modal
      ref="modalRef"
      direction="ltr"
      size="w-[80vw] min-w-[200px] md:w-[60vw] md:max-w-[400px] lg:w-[50vw] lg:max-w-[600px]"
    >
      <template #body>
        <h3 class="font-bold text-lg">动态大小</h3>
        <p class="py-4">调整屏幕大小，观察modal宽度</p>
      </template>
    </Modal>

    <button class="li-btn" @click="handleOpenModal">打开动态modal</button>
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
