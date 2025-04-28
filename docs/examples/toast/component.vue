<template>
  <div>
    <Toast ref="toastRef" type="success" position="top-center">
      <div class="text-xl font-bold">这是插槽部分</div>
    </Toast>
    <button class="btn" @click="toastFunc">toast</button>
  </div>
</template>

<script setup lang="ts">
import { Toast } from 'li-daisy'
import type { ToastRef } from 'li-daisy'
import { ref } from 'vue'

const toastRef = ref<ToastRef>()

const toastFunc = () => {
  toastRef.value?.show()
}
</script>
