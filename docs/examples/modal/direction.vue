<template>
  <div class="grid gap-4 grid-cols-3 min-w-sm">
    <div></div>

    <Modal ref="modalTtb" direction="ttb">
      <h3 class="font-bold text-lg">从上到下 (ttb)</h3>
      <p class="py-4">This is the modal content.</p>
    </Modal>
    <button class="btn btn-primary" @click="modalTtb?.open()">上↓下 Modal</button>

    <div></div>

    <Modal ref="modalLtr" direction="ltr">
      <h3 class="font-bold text-lg">从左到右 (ltr)</h3>
      <p class="py-4">This is the modal content.</p>
    </Modal>
    <button class="btn btn-primary" @click="modalLtr?.open()">左→右 Modal</button>

    <Modal ref="modalMid" direction="middle">
      <h3 class="font-bold text-lg">中间 (middle)</h3>
      <p class="py-4">This is the modal content.</p>
    </Modal>
    <button class="btn btn-primary" @click="modalMid?.open()">中间 Modal</button>

    <Modal ref="modalRtl" direction="rtl">
      <h3 class="font-bold text-lg">从右到左 (rtl)</h3>
      <p class="py-4">This is the modal content.</p>
    </Modal>
    <button class="btn btn-primary" @click="modalRtl?.open()">左←右 Modal</button>

    <div></div>

    <Modal ref="modalBtt" direction="btt">
      <h3 class="font-bold text-lg">从下到上 (btt)</h3>
      <p class="py-4">This is the modal content.</p>
    </Modal>
    <button class="btn btn-primary" @click="modalBtt?.open()">上↑下 Modal</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Modal, type ModalRef } from 'li-daisy'

const modalLtr = ref<ModalRef>()
const modalRtl = ref<ModalRef>()
const modalMid = ref<ModalRef>()
const modalTtb = ref<ModalRef>()
const modalBtt = ref<ModalRef>()
</script>
