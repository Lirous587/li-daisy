<template>
  <div>
    <!-- 当加载中时显示骨架屏 -->
    <div v-if="isLoading" :class="$attrs.class" class="select-none">
      <div v-for="i in props.count" :key="i">
        <slot name="skeleton"></slot>
      </div>
    </div>

    <!-- 加载完成后显示实际内容 -->
    <div v-show="!isLoading">
      <slot name="content" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { SkeletonProps } from './types'
import { onUnmounted, ref, watch } from 'vue'

const props = withDefaults(defineProps<SkeletonProps>(), {
  count: 1,
  delay: 300,
})

// 代理props 用于delay
const isLoading = ref(props.loading)

// delay计时器
let timer: ReturnType<typeof setTimeout> | null = null

watch(
  () => props.loading,
  loadingStatus => {
    if (timer) clearTimeout(timer)

    // 如果从加载中变为加载完成，添加延迟
    if (!loadingStatus && isLoading.value) {
      // 上述条件表示 外部刚刚通知加载完成 (!loadingStatus)，
      // 并且组件内部当前仍然处于加载状态
      timer = setTimeout(() => {
        isLoading.value = false
      }, props.delay)
    } else {
      // 如果从加载完成变为加载中，立即显示骨架屏
      isLoading.value = loadingStatus
    }
  }
)

// 组件卸载时清除定时器
onUnmounted(() => {
  if (timer) clearTimeout(timer)
})
</script>
