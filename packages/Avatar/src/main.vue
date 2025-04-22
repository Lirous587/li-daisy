<template>
  <div class="m-1">
    <div v-if="ifFailed" class="avatar avatar-placeholder">
      <div class="bg-base-300 text-neutral-content font-bold rounded-full" :class="sizeClass">
        <span class="text-base-content">{{ props.text }}</span>
      </div>
    </div>
    <div v-else class="avatar">
      <div
        class="ring-base-300 ring-offset-base-100 rounded-full ring ring-offset-2"
        :class="sizeClass"
      >
        <img :src="props.avatar" @load="handleLoad" @error="handleError" />
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

const ifFailed = ref(!props.avatar)

const sizeClass = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'w-8 h-8'
    case 'md':
      return 'w-12 h-12'
    case 'lg':
      return 'w-16 h-16'
    case 'xl':
      return 'w-20 h-20'
    default:
      return 'w-12 h-12'
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
  () => props.avatar,
  (newVal) => {
    ifFailed.value = !newVal
  },
)

onMounted(() => {
  // 如果没有头像，直接显示名称首字母
  ifFailed.value = !props.avatar
})
</script>
