<template>
  <div>
    <div v-if="ifFailed" class="avatar avatar-placeholder">
      <div class="bg-base-300 text-neutral-content font-bold rounded-full" :class="sizeClass">
        <span class="text-base-content">{{ props.name ? props.name[0] : '' }}</span>
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
  name: '',
  size: 'md',
})

const ifFailed = ref(!props.avatar)

const sizeClass = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'w-6 h-6'
    case 'lg':
      return 'w-12 h-12'
    default:
      return 'w-8 h-8'
  }
})

const handleLoad = () => {
  ifFailed.value = false
}

const handleError = () => {
  ifFailed.value = true
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

<script lang="ts">
export default {
  name: 'LiAvatar',
}
</script>
