<template>
  <div class="flex flex-col items-center gap-y-4">
    <Popover v-for="position in positions" :position="position">
      <template #trigger>
        <div class="btn">{{ position }}</div>
      </template>
      <template #content>
        <div class="card bg-base-100 border border-base-200 shadow-md">
          <div class="card-body">注意我的位置</div>
        </div>
      </template>
    </Popover>
  </div>
</template>

<script setup lang="ts">
import { Popover, type PopoverPositon } from 'li-daisy'

const positions: Array<PopoverPositon> = ['left', 'top', 'right', 'bottom']
</script>
