<template>
  <div class="w-full flex flex-col gap-y-4">
    <Paging v-for="size in sizes" class="m-auto" :pages="10" :size="size"></Paging>
  </div>
</template>

<script setup lang="ts">
// import { Paging } from 'li-daisy'
import { ref } from 'vue'
import { Paging, type PagingSize } from '../../../packages'

const sizes = ref<PagingSize[]>(['xs', 'sm', 'md', 'lg', 'xl'])
</script>
