<template>
  <div class="space-y-6">
    <Skeleton :loading="true" :delay="1000">
      <template #skeleton>
        <div class="relative border border-base-300 rounded-box bg-base-100 overflow-hidden">
          <ul class="list flex flex-col divide-y divide-base-300">
            <li v-for="i in 3" :key="i" class="p-4 space-y-3">
              <div class="grid items-center gap-4" style="grid-template-columns: auto 1fr auto">
                <div class="skeleton opacity-60 size-10 rounded-full"></div>

                <div class="space-y-2">
                  <div class="skeleton opacity-60 w-36 h-3 rounded-box"></div>
                  <div class="skeleton opacity-60 w-24 h-2 rounded-box"></div>
                </div>

                <div class="skeleton opacity-60 h-8 w-8 rounded-box"></div>
              </div>

              <div class="skeleton opacity-60 w-[50%] h-3 rounded-box"></div>
            </li>
          </ul>

          <div
            class="absolute bottom-0 left-0 right-0 top-32 pointer-events-none z-10 bg-gradient-to-t from-base-100 from-60% to-transparent"
          ></div>
        </div>
      </template>
    </Skeleton>
  </div>
</template>

<script setup lang="ts">
import { Skeleton } from 'li-daisy'
</script>
