<template>
  <div class="flex flex-col gap-4">
    <div class="flex items-center justify-around gap-3">
      <div class="btn" @click="setTrue">开启 loading</div>
      <div class="btn" @click="setFalse">关闭 loading</div>
      <div class="btn" @click="toggle">切换 loading</div>
    </div>

    <div
      class="mx-auto border border-base-300 rounded-lg p-4 w-[280px] h-[120px] relative"
      v-loading:infinity="loading"
    >
      <div>这是一个块级容器</div>
      <div class="text-sm opacity-70">指令只会覆盖此容器，不是全屏</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { toast } from 'li-daisy'

const loading = ref(true)
const toggle = () => (loading.value = !loading.value)
const setTrue = () => (loading.value = true)
const setFalse = () => (loading.value = false)

const handleFoo = () => {
  toast.info('foo')
}
</script>
