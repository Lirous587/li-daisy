<template>
  <div class="w-full flex justify-around gap-x-3">
    <button class="btn" @click="toastInfo">info</button>
    <button class="btn" @click="toastSuccess">success</button>
    <button class="btn" @click="toastWarning">warning</button>
    <button class="btn" @click="toastError">error</button>
  </div>
</template>

<script setup lang="ts">
import { toast } from 'li-daisy'

const toastInfo = () => {
  toast.info('fuck you,damn')
}
const toastSuccess = () => {
  toast.success('fuck you,damn')
}
const toastWarning = () => {
  toast.warning('fuck you,damn')
}
const toastError = () => {
  toast.error('fuck you,damn')
}
</script>
