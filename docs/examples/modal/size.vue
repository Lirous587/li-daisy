<template>
  <div class="flex items-center gap-x-3">
    <div>
      <Modal
        ref="modalRef1"
        direction="ltr"
        size="w-[80vw] min-w-[200px] md:w-[60vw] md:max-w-[400px] lg:w-[50vw] lg:max-w-[600px]"
      >
        <h3 class="font-bold text-lg">Hello!</h3>
        <p class="py-4">This is the modal content.</p>
      </Modal>

      <button class="btn btn-primary" @click="handleOpenModal1">方向为ltr</button>
    </div>
    <div>
      <Modal
        ref="modalRef2"
        direction="ttb"
        size="h-[80vh] min-h-[200px] md:h-[60vh] md:max-h-[400px] lg:h-[50v] lg:max-h-[600px]"
      >
        <h3 class="font-bold text-lg">Hello!</h3>
        <p class="py-4">This is the modal content.</p>
      </Modal>

      <button class="btn btn-primary" @click="handleOpenModal2">方向为ttb</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Modal, type ModalRef } from 'li-daisy'

const modalRef1 = ref<ModalRef>()

const handleOpenModal1 = () => {
  modalRef1.value?.open()
}

const modalRef2 = ref<ModalRef>()

const handleOpenModal2 = () => {
  modalRef2.value?.open()
}
</script>
