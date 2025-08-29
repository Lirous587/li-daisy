<template>
  <div class="m-1">
    <div v-if="ifFailed" class="avatar avatar-placeholder">
      <div
        class="ring-offset-base-100 ring ring-offset-2 ring-base-300 bg-base-300 text-neutral-content font-bold rounded-full aspect-square"
        :class="sizeClass"
      >
        <span class="text-base-content">{{ props.text }}</span>
      </div>
    </div>
    <div v-else class="avatar">
      <div
        class="ring-offset-base-100 ring ring-offset-2 ring-base-300 rounded-full aspect-square"
        :class="sizeClass"
      >
        <img :src="props.url" @load="handleLoad" @error="handleError" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, watch } from 'vue'
import type { AvatarProps } from './types'

const props = withDefaults(defineProps<AvatarProps>(), {
  text: '',
  size: 'md',
})

const ifFailed = ref(!props.url)

const sizeClass = computed(() => {
  switch (props.size) {
    case 'xs':
      return 'h-6'
    case 'sm':
      return 'h-8'
    case 'md':
      return 'h-10'
    case 'lg':
      return 'h-12'
    case 'xl':
      return 'h-14'
    default:
      return 'h-8'
  }
})

const emits = defineEmits(['success', 'failed'])

const handleLoad = () => {
  ifFailed.value = false
  emits('success')
}

const handleError = () => {
  ifFailed.value = true
  emits('failed')
}

watch(
  () => props.url,
  (newVal) => {
    ifFailed.value = !newVal
  },
)

onMounted(() => {
  // 如果没有头像，直接显示名称首字母
  ifFailed.value = !props.url
})
</script>
