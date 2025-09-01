<template>
  <div class="flex w-full justify-between gap-x-5">
    <Modal ref="modalRef1" show-close-icon>
      <template #body>
        <h3 class="font-bold text-lg">该modal有关闭图标</h3>
        <p class="py-4">该modal有关闭图标</p>
      </template>
    </Modal>

    <button class="btn btn-primary" @click="handleOpenModal1">该modal有关闭图标</button>

    <Modal ref="modalRef2" :show-close-icon="false">
      <template #body>
        <h3 class="font-bold text-lg">该modal无关闭图标</h3>
        <p class="py-4">该modal无关闭图标</p>
      </template>
    </Modal>

    <button class="btn btn-primary" @click="handleOpenModal2">该modal无关闭图标</button>
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
