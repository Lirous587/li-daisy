<template>
  <div class="w-full flex">
    <Paging class="m-auto" :pages="10" :show-icon="false"></Paging>
  </div>
</template>

<script setup lang="ts">
import { Paging } from 'li-daisy'
</script>
