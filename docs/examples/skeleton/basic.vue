<template>
  <div>
    <img class="sr-only" src="https://picsum.photos/300/300" @load="handleImgLoad" />

    <Skeleton :loading="loading" :delay="500">
      <template #content>
        <div class="space-y-3">
          <img
            v-for="i in 3"
            :key="i"
            class="mx-auto w-30 h-30 rounded-md"
            src="https://picsum.photos/300/300"
          />
        </div>
      </template>
      <template #skeleton>
        <div class="space-y-3">
          <div v-for="i in 3" :key="i" class="li-skeleton mx-auto w-30 h-30 rounded-md" />
        </div>
      </template>
    </Skeleton>
  </div>
</template>

<script setup lang="ts">
import { Skeleton } from 'li-daisy'
import { ref } from 'vue'

const loading = ref(true)

const handleImgLoad = () => {
  loading.value = false
}
</script>
