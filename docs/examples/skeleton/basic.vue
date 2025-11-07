<template>
  <div>
    <img class="sr-only" src="https://picsum.photos/300/300" @load="handleImgLoad" />

    <Skeleton :loading="loading" :count="3" :delay="500">
      <template #content>
        <div v-for="i in 3" :key="i" class="flex w-full my-3">
          <img class="m-auto w-30 h-30 rounded-md" src="https://picsum.photos/300/300" />
        </div>
      </template>
      <template #skeleton>
        <div class="flex w-full my-3">
          <SkeletonItem class="m-auto w-30 h-30" />
        </div>
      </template>
    </Skeleton>
  </div>
</template>

<script setup lang="ts">
import { Skeleton, SkeletonItem } from 'li-daisy'
import { ref } from 'vue'

const loading = ref(true)

const handleImgLoad = () => {
  loading.value = false
}
</script>
