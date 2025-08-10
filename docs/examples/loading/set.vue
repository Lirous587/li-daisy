<template>
  <div class="flex flex-col gap-6">
    <div class="flex items-center justify-around gap-3">
      <div class="btn" @click="setTrue">开启 loading</div>
      <div class="btn" @click="setFalse">关闭 loading</div>
      <div class="btn" @click="toggle">切换 loading</div>
    </div>

    <div class="flex flex-col gap-8 mt-4 items-center">
      <!-- 参数模式：type=ball -->
      <div
        class="border border-base-300 rounded-lg p-4 w-64 h-32 relative"
        v-loading:ball="loading"
      ></div>
      <!-- 修饰符模式：type=bars, color=error, size=xs -->
      <div
        class="border border-base-300 rounded-lg p-4 w-64 h-32 relative"
        v-loading:bars.error.xs="loading"
      ></div>

      <!-- 对象模式：同时配置 visible/type/color/size -->
      <div
        class="border border-base-300 rounded-lg p-4 w-64 h-32 relative"
        v-loading="{ visible: loading, type: 'ring', color: 'accent', size: 'lg' }"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const loading = ref(true)
const toggle = () => (loading.value = !loading.value)
const setTrue = () => (loading.value = true)
const setFalse = () => (loading.value = false)
</script>
