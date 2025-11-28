<template>
  <div class="grid gap-4 grid-cols-3 min-w-sm">
    <div></div>

    <Modal direction="ttb">
      <template #body>
        <h3 class="font-bold text-lg">从上到下 (ttb)</h3>
        <p class="py-4">This is the modal content.</p>
      </template>
      <template #trigger>
        <div class="btn">上↓下</div>
      </template>
    </Modal>

    <div></div>

    <Modal direction="ltr">
      <template #body>
        <h3 class="font-bold text-lg">从左到右 (ltr)</h3>
        <p class="py-4">This is the modal content.</p>
      </template>
      <template #trigger>
        <div class="btn">左→右</div>
      </template>
    </Modal>

    <Modal direction="middle">
      <template #body>
        <h3 class="font-bold text-lg">中间 (middle)</h3>
        <p class="py-4">This is the modal content.</p>
      </template>
      <template #trigger>
        <div class="btn">中间</div>
      </template>
    </Modal>

    <Modal direction="rtl">
      <template #body>
        <h3 class="font-bold text-lg">从右到左 (rtl)</h3>
        <p class="py-4">This is the modal content.</p>
      </template>
      <template #trigger>
        <div class="btn">左←右</div>
      </template>
    </Modal>

    <div></div>

    <Modal direction="btt">
      <template #body>
        <h3 class="font-bold text-lg">从下到上 (btt)</h3>
        <p class="py-4">This is the modal content.</p>
      </template>
      <template #trigger>
        <div class="btn">上↑下</div>
      </template>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { Modal } from 'li-daisy'
</script>
