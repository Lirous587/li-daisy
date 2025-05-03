<template>
  <div class="w-full flex">
    <Paging class="m-auto" :pages="10" hide-icon-on-sm></Paging>
  </div>
</template>

<script setup lang="ts">
import { Paging } from 'li-daisy'
</script>
