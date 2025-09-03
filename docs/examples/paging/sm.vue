<template>
  <div class="w-full flex">
    <Paging v-model="currentPage" class="m-auto" :pages="10" hide-icon-on-sm></Paging>
  </div>
</template>

<script setup lang="ts">
import { Paging } from 'li-daisy'
import { ref } from 'vue'

const currentPage = ref(1)
</script>
