<template>
  <div class="w-full flex justify-between">
    <Popover trigger="hover" :z-index="100">
      <template #trigger>
        <button class="btn btn-primary">hover</button>
      </template>
      <template #content>
        <Card />
      </template>
    </Popover>
    <Popover trigger="click" :z-index="100">
      <template #trigger>
        <button class="btn btn-primary">click</button>
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
