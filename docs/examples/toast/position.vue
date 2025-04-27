<template>
  <div class="w-full flex justify-around">
    <button class="btn" @click="toastTopStart">top start</button>
    <button class="btn" @click="toastTopCenter">top center</button>
    <button class="btn" @click="toastTopEnd">top end</button>
    <button class="btn" @click="toastBottomStart">bottom start</button>
    <button class="btn" @click="toastBottomEnd">bottom end</button>
  </div>
</template>

<script setup lang="ts">
import { toast } from 'li-daisy'

const toastTopStart = () => {
  toast.info('top start', { position: 'top-start' })
}
const toastTopCenter = () => {
  toast.info('top center', { position: 'top-center' })
}
const toastTopEnd = () => {
  toast.info('top end', { position: 'top-end' })
}
const toastBottomStart = () => {
  toast.info('bottom start', { position: 'bottom-start' })
}
const toastBottomEnd = () => {
  toast.info('bottom end', { position: 'bottom-end' })
}
</script>
