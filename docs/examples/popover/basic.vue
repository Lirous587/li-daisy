<template>
  <div class="w-full flex justify-center">
    <Popover position="bottom" trigger="hover" :z-index="100">
      <template #trigger>
        <button class="btn btn-primary">trigger</button>
      </template>
      <template #content>
        <Card />
      </template>
    </Popover>
  </div>
</template>

<script setup lang="ts">
import { Popover } from 'li-daisy'

import Card from '../demo/Card.vue'
</script>
