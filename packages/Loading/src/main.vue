<template>
  <div
    v-if="props.visible"
    class="li-loading"
    :class="[loadingClasses.type, loadingClasses.color, loadingClasses.size]"
  ></div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { LoadingProps } from './types'
import { getLoadingClasses } from './directive'

const props = withDefaults(defineProps<LoadingProps>(), {
  visible: false,
  type: 'spinner',
  color: 'primary',
  size: 'md',
})

const loadingClasses = computed(() => getLoadingClasses(props))
</script>
