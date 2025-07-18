<template>
  <div class="flex flex-col items-center gap-y-4">
    <Popover v-for="placement in placements" :placement="placement">
      <template #trigger>
        <div class="btn">{{ placement }}</div>
      </template>
      <template #content>
        <div class="card bg-base-200 border border-base-200 shadow-md">
          <div class="card-body">注意我的位置</div>
        </div>
      </template>
    </Popover>
  </div>
</template>

<script setup lang="ts">
import { Popover, type PopoverPlacement } from 'li-daisy'

const placements: Array<PopoverPlacement> = ['left', 'top', 'right', 'bottom']
</script>
