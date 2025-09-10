<template>
  <div class="flex flex-col gap-4">
    <div class="flex items-center justify-around gap-3">
      <div class="li-btn" @click="setTrue">开启 loading1</div>
      <div class="li-btn" @click="setFalse">关闭 loading1</div>
      <div class="li-btn" @click="toggle">切换 loading1</div>
    </div>

    <div
      v-loading:infinity="loading1"
      class="mx-auto border border-base-300 rounded-lg p-4 w-[280px] h-[120px] relative"
    >
      <div>这是一个块级容器</div>
      <div class="text-sm opacity-70">该加载状态由loading1控制</div>
    </div>

    <div
      v-loading:bars.neutral.xs="loading2"
      class="mx-auto border border-base-300 rounded-lg p-4 w-[280px] h-[120px] relative"
    >
      <div>这是另外一个块级容器</div>
      <div class="text-sm opacity-70">该加载状态由loading2控制</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const loading1 = ref(true)
const toggle = () => (loading1.value = !loading1.value)
const setTrue = () => (loading1.value = true)
const setFalse = () => (loading1.value = false)

const loading2 = ref(true)
</script>
