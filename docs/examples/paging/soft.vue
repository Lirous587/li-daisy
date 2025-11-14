<template>
  <div class="w-full flex flex-col gap-y-4">
    <Paging
      v-for="color in colors"
      :key="color"
      v-model="currentPage"
      class="m-auto"
      :pages="10"
      :color="color"
      :soft="true"
    ></Paging>
  </div>
</template>

<script setup lang="ts">
import { Paging, type PagingColor } from 'li-daisy'
import { ref } from 'vue'

const colors = ref<PagingColor[]>([
  'base',
  'neutral',
  'primary',
  'secondary',
  'accent',
  'info',
  'success',
  'warning',
  'error',
])

const currentPage = ref(5)
</script>
