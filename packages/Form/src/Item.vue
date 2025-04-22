<template>
  <div class="p-1 my-1">
    <div v-if="isSetLabelWidth">
      <div class="flex items-center">
        <div :style="{ width: labelWidth }" class="text-sm font-bold mr-1">
          <label v-if="label">{{ label }}</label>
        </div>
        <div class="flex-1">
          <slot></slot>
        </div>
      </div>
      <div :style="{ marginLeft: labelWidth }" class="truncate text-error text-sm h-5">
        {{ error }}
      </div>
    </div>

    <div v-else>
      <div class="text-sm font-bold mb-0.5">
        <label v-if="label">{{ label }}</label>
      </div>
      <div>
        <slot></slot>
      </div>
      <div class="truncate text-error text-sm h-5">
        {{ error }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { FormItemProps } from './types'

import { computed, inject, ref, watch } from 'vue'

const props = defineProps<FormItemProps>()

const labelWidth = inject<string>('labelWidth', '')

const isSetLabelWidth = computed(() => !!labelWidth)

// 从父组件注入的表单数据，提供默认值以确保响应式
const errors = inject<Record<string, string>>('errors', {})

const error = ref('')

watch(
  errors,
  (newErrors) => {
    error.value = newErrors[props.name]
  },
  {
    immediate: true,
    deep: true,
  },
)
</script>
