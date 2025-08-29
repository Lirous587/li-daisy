<template>
  <div class="w-full flex flex-col gap-y-4 items-center">
    <Paging v-model="currentPage" v-for="size in sizes" :pages="10" :size="size"></Paging>
  </div>
</template>

<script setup lang="ts">
import { Paging, type PagingSize } from 'li-daisy'
import { ref } from 'vue'

const sizes = ref<PagingSize[]>(['xs', 'sm', 'md', 'lg', 'xl'])

const currentPage = ref(0)
</script>
