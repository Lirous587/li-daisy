<template>
  <div class="flex gap-8">
    <!-- 会卸载内容的弹窗 -->
    <div>
      <Modal ref="modalRef1" :destroy-on-close="true">
        <template #body>
          <h3 class="font-bold text-lg">关闭时卸载组件</h3>
          <p class="py-4">弹窗关闭后，内部内容会被卸载，重新打开会重新挂载。</p>
          <Count />
        </template>
      </Modal>
      <button class="li-btn li-btn-primary" @click="handleOpenModal1">打开弹窗（卸载内容）</button>
    </div>

    <!-- 不会卸载内容的弹窗 -->
    <div>
      <Modal ref="modalRef2">
        <template #body>
          <h3 class="font-bold text-lg">关闭时不卸载组件</h3>
          <p class="py-4">弹窗关闭后，内部内容不会被卸载，重新打开会保留上次状态。</p>
          <Count />
        </template>
      </Modal>
      <button class="li-btn li-btn-primary" @click="handleOpenModal2">打开弹窗（保留内容）</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Modal, type ModalRef } from 'li-daisy'
import Count from '../demo/Count.vue'

const modalRef1 = ref<ModalRef>()
const modalRef2 = ref<ModalRef>()

const handleOpenModal1 = () => {
  modalRef1.value?.open()
}
const handleOpenModal2 = () => {
  modalRef2.value?.open()
}
</script>
