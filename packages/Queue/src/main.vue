<template>
  <Teleport to="body">
    <div v-if="items.length > 0" class="fixed z-[9999] pointer-events-none" :class="positionClass">
      <TransitionGroup
        :name="transitionPrefix + '-queue'"
        tag="div"
        class="flex flex-col gap-3"
        :class="directionClass"
        appear
      >
        <div v-for="item in items" :key="item.id" :style="{ zIndex: item.ZIndex }">
          <QueueItemRender
            :content="item.content"
            @close="() => handleRemove(item.id)"
          ></QueueItemRender>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { QueueProps } from './types'
import QueueItemRender from './item.vue'

const props = withDefaults(defineProps<QueueProps>(), {
  position: 'top-start',
  autoClose: true,
})

const items = computed(() => props.items)

const transitionPrefix = computed(() => {
  if (props.position.includes('start')) {
    return 'left'
  } else if (props.position.includes('end')) {
    return 'right'
  }
  return 'top-center'
})

const emit = defineEmits<{
  remove: [id: string]
}>()

const handleRemove = (id: string) => {
  emit('remove', id)
}

const positionClass = computed(() => {
  switch (props.position) {
    case 'top-start':
      return 'top-8 left-10'
    case 'top-center':
      return 'top-8 left-1/2 -translate-x-1/2'
    case 'top-end':
      return 'top-8 right-10'
    case 'bottom-start':
      return 'bottom-8 left-10'
    case 'bottom-end':
      return 'bottom-8 right-10'
    default:
      return 'top-8 left-10'
  }
})

const directionClass = computed(() => {
  return props.position.includes('bottom') ? 'flex-col-reverse' : 'flex-col'
})
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
  /* position: absolute; */
  left: 0;
  top: 0;
}

/* 进入状态 */
.left-queue-enter-from {
  opacity: 0;
  transform: translateX(-100%);
}

.top-center-queue-enter-from {
  opacity: 0;
  transform: translateY(-100%);
}

.right-queue-enter-from {
  opacity: 0;
  transform: translateX(100%);
}
</style>
