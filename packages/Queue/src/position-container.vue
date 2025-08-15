<template>
  <TransitionGroup :name="transitionPrefix + '-queue'" tag="div" appear>
    <div
      v-for="(item, index) in props.items"
      :key="item.id"
      ref="itemRefs"
      class="absolute transition-all duration-300"
      :class="basePositionClass"
      :style="{
        zIndex: item.ZIndex,
        ...getPrecisePosition(index),
      }"
    >
      <QueueItemRender :content="item.content" @close="() => $emit('remove', item.id)" />
    </div>
  </TransitionGroup>
</template>

<script setup lang="ts">
import { computed, ref, nextTick, watch } from 'vue'
import type { QueuePosition, QueueItem } from './types'
import QueueItemRender from './item.vue'

const props = defineProps<{
  position: QueuePosition
  items: QueueItem[]
}>()

defineEmits<{
  remove: [id: string]
}>()

// 存储每个元素的引用
const itemRefs = ref<HTMLElement[]>([])

// 存储每个元素的高度
const itemHeights = ref<number[]>([])

const transitionPrefix = computed(() => {
  if (props.position.includes('start')) {
    return 'left'
  } else if (props.position.includes('end')) {
    return 'right'
  }
  return 'top-center'
})

const basePositionClass = computed(() => {
  switch (props.position) {
    case 'top-start':
      return 'top-4 left-5'
    case 'top-center':
      return 'top-4 left-1/2 -translate-x-1/2'
    case 'top-end':
      return 'top-4 right-5'
    case 'bottom-start':
      return 'bottom-4 left-5'
    case 'bottom-end':
      return 'bottom-4 right-5'
    default:
      return 'top-4 left-5'
  }
})

// 监听 items 变化，重新计算高度
watch(
  () => props.items,
  async () => {
    await nextTick()
    updateItemHeights()
  },
  { immediate: true, deep: true },
)

// 更新元素高度
const updateItemHeights = () => {
  itemHeights.value = itemRefs.value.map((el) => {
    return el ? el.offsetHeight + 12 : 80 // 默认高度80px，加上12px间距
  })
}

// 根据实际高度计算精确位置
const getPrecisePosition = (index: number) => {
  const accumulatedHeight = itemHeights.value
    .slice(0, index)
    .reduce((sum, height) => sum + height, 0)

  const yOffset = props.position.includes('bottom') ? -accumulatedHeight : accumulatedHeight

  switch (props.position) {
    case 'top-center':
      return {
        translate: `-50% ${yOffset}px`,
      }
    case 'top-start':
    case 'top-end':
      return {
        translate: `0 ${yOffset}px`,
      }
    case 'bottom-start':
    case 'bottom-end':
      return {
        translate: `0 ${yOffset}px`,
      }
    default:
      return {}
  }
}
</script>

<style scoped>
.left-queue-enter-active,
.left-queue-move,
.left-queue-leave-active,
.top-center-queue-enter-active,
.top-center-queue-move,
.top-center-queue-leave-active,
.right-queue-enter-active,
.right-queue-move,
.right-queue-leave-active {
  transition: all 0.3s ease-in-out;
}

/* 离开时其他元素保持稳定 */
.left-queue-leave-active,
.top-center-queue-leave-active,
.right-queue-leave-active {
  position: absolute;
}

/* 进入状态 */
.left-queue-enter-from,
.left-queue-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}

.top-center-queue-enter-from,
.top-center-queue-leave-to {
  opacity: 0;
  transform: translateY(-100%);
}

.right-queue-enter-from,
.right-queue-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>
