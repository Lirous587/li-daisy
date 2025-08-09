<template>
  <div class="loading" v-if="props.visible" :class="[loadingType, loadingColor, loadingSize]"></div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { LoadingProps } from './types'

const props = withDefaults(defineProps<LoadingProps>(), {
  visible: false,
  type: 'spinner',
  color: 'primary',
  size: 'md',
})

const loadingType = computed(() => {
  switch (props.type) {
    case 'spinner':
      return 'loading-spinner'
    case 'dots':
      return 'loading-dots'
    case 'ring':
      return 'loading-ring'
    case 'ball':
      return 'loading-ball'
    case 'bars':
      return 'loading-bars'
    case 'infinity':
      return 'loading-infinity'
    default:
      return 'loading-spinner'
  }
})

const loadingColor = computed(() => {
  switch (props.color) {
    case 'primary':
      return 'text-primary'
    case 'secondary':
      return 'text-secondary'
    case 'accent':
      return 'text-accent'
    case 'neutral':
      return 'text-neutral'
    case 'info':
      return 'text-info'
    case 'success':
      return 'text-success'
    case 'warning':
      return 'text-warning'
    case 'error':
      return 'text-error'
    default:
      return 'text-primary'
  }
})

const loadingSize = computed(() => {
  switch (props.size) {
    case 'xs':
      return 'loading-xs'
    case 'sm':
      return 'loading-sm'
    case 'md':
      return 'loading-md'
    case 'lg':
      return 'loading-lg'
    case 'xl':
      return 'loading-xl'
    default:
      return 'loading-md'
  }
})
</script>
