<template>
  <div class="w-full flex flex-col gap-y-4">
    <!-- <Paging :pages="1" :hide-on-single-page="true"></Paging>
    <Paging :pages="1" :hide-icon-on-sm="true"></Paging> -->

    <Paging
      v-for="color in colors"
      :key="color"
      v-model="currentPage"
      class="m-auto opacity-80"
      :soft="true"
      :pages="10"
      :color="color"
    ></Paging>
  </div>
</template>

<script setup lang="ts">
// import { Paging, type PagingColor } from 'li-daisy'
import { Paging, type PagingColor } from '../../../packages'

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

const currentPage = ref(1)
</script>
