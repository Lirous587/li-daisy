<template>
  <div>
    <Skeleton :loading="loading" :count="3" :delay="400">
      <template #content>
        <div class="flex w-full my-3" v-for="i in 3" :key="i">
          <img
            class="m-auto w-30 h-30 rounded-md"
            src="https://picsum.photos/300/300"
            @load="handleImgLoad"
          />
        </div>
      </template>
      <template #skeleton>
        <div class="flex w-full my-3">
          <div class="skeleton m-auto w-30 h-30" />
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
