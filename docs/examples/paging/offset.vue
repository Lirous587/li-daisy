<template>
  <div class="w-full flex">
    <Paging v-model="currentPage" class="m-auto" :pages="10" :current-page="5" :offset="2"></Paging>
  </div>
</template>

<script setup lang="ts">
import { Paging } from 'li-daisy'
import { ref } from 'vue';

const currentPage = ref(0)
</script>
