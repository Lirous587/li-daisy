<template>
  <div class="w-full flex flex-col items-center">
    <p class="font-bold">单页时隐藏分页</p>
    <Paging :pages="1" :hide-on-single-page="true"></Paging>
  </div>
</template>

<script setup lang="ts">
import { Paging } from 'li-daisy'
</script>
