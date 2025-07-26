<template>
  <div class="w-full flex justify-center">
    <Popover position="bottom" trigger="hover" :z-index="100">
      <template #trigger>
        <button class="btn btn-primary">trigger</button>
      </template>
      <template #content>
        <div class="card bg-base-100 max-w-96 shadow-sm">
          <div class="card-body">
            <h2 class="card-title">Card title!</h2>
            <p>
              A card component has a figure, a body part, and inside body there are title and
              actions parts
            </p>
            <div class="card-actions justify-end">
              <div class="btn btn-primary">Buy Now</div>
            </div>
          </div>
        </div>
      </template>
    </Popover>
  </div>
</template>

<script setup lang="ts">
import { Popover } from 'li-daisy'
</script>
