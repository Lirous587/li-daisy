<template>
  <button class="btn" @click="toastFunc">toast</button>
</template>

<script setup lang="ts">
import { toast } from 'li-daisy'

const toastFunc = () => {
  toast.info('fuck you,damn', {
    direction: 'top-start',
    duration: 4000,
  })
}
</script>
