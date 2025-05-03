<template>
  <div>
    <Toast ref="toastRef" type="custom" position="top-center" class="bg-base-200" :duration="5000">
      <Skeleton :loading="skeletonLoading" :delay="1500">
        <template #content>
          <div class="card w-60 h-50">
            <figure class="p-2">
              <img
                src="/favicon.ico"
                class="object-cover h-24 w-full rounded-xl"
                @load="handleLoad"
              />
            </figure>

            <div class="card-body">
              <div class="card-title">custom支持自定义toast</div>
              <div class="text-xs font-serif opacity-70 mt-2">这是一些废话....</div>
            </div>
          </div>
        </template>
        <template #skeleton>
          <div class="card w-60 h-50">
            <figure class="p-2">
              <SkeletonItem class="h-24 w-full rounded-xl" />
            </figure>

            <div class="card-body">
              <SkeletonItem class="h-3.5 w-30 bg-base-content/50" />
              <SkeletonItem class="h-2 w-45 mt-2" />
            </div>
          </div>
        </template>
      </Skeleton>
    </Toast>
    <button class="btn" @click="toastFunc">toast</button>
  </div>
</template>

<script setup lang="ts">
import { Toast, Skeleton, SkeletonItem } from 'li-daisy'
import type { ToastRef } from 'li-daisy'
import { ref } from 'vue'

const toastRef = ref<ToastRef>()

const toastFunc = () => {
  toastRef.value?.show()
}

const skeletonLoading = ref(true)
const handleLoad = () => {
  skeletonLoading.value = false
}
</script>
