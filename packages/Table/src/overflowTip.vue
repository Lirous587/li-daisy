<template>
  <Popover class="w-full" :z-index="1" position="top" :duration="200" :offset="3">
    <template #content>
      <div
        v-show="isOverflowing"
        class="relative bg-neutral px-1.5 py-0.5 rounded-box border border-accent text-neutral-content text-sm max-w-sm"
      >
        {{ tooltipContent }}
      </div>
    </template>
    <template #trigger>
      <div ref="contentRef" class="overflow-hidden text-ellipsis whitespace-nowrap">
        <slot></slot>
      </div>
    </template>
  </Popover>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted, watch } from 'vue'
import { Popover } from '../../Popover'

interface TooltipProps {
  content: unknown
}

const props = defineProps<TooltipProps>()

// --- 溢出检测逻辑 ---
const contentRef = ref<HTMLElement | null>(null)
const isOverflowing = ref(false)
let resizeObserver: ResizeObserver | null = null

// Tooltip 的内容，仅在需要显示时提供
const tooltipContent = computed(() => {
  if (isOverflowing.value) {
    return props.content
  }

  return ''
})

const checkOverflow = () => {
  const el = contentRef.value
  if (el) {
    const newOverflowing = el.scrollWidth > el.clientWidth
    isOverflowing.value = newOverflowing
  }
}

watch(() => props.content, checkOverflow)

onMounted(() => {
  if (contentRef.value) {
    resizeObserver = new ResizeObserver(checkOverflow)
    resizeObserver.observe(contentRef.value)
  }
})

onUnmounted(() => {
  if (resizeObserver) {
    resizeObserver.disconnect()
  }
})
</script>
