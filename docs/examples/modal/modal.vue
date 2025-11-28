<template>
  <div class="flex w-full justify-between gap-x-5">
    <Modal ref="modalRef1" :close-on-click-modal="true">
      <template #body>
        <h3 class="font-bold text-lg">当前点击蒙层可关闭抽屉</h3>
        <p class="py-4">当前点击蒙层可关闭modal</p>
      </template>
    </Modal>

    <button class="btn" @click="handleOpenModal1">点击蒙层可关闭</button>

    <Modal ref="modalRef2" :close-on-click-modal="false">
      <template #body>
        <h3 class="font-bold text-lg">当前点击蒙层不可关闭抽屉</h3>
        <p class="py-4">当前点击蒙层不可关闭抽屉</p>
      </template>
    </Modal>

    <button class="btn" @click="handleOpenModal2">点击蒙层不可关闭</button>
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
