<template>
  <div class="w-full flex">
    <Paging class="m-auto" :pages="10" :sm-hide-icon="true"></Paging>
  </div>
</template>

<script setup lang="ts">
import { Paging } from 'li-daisy'
</script>
