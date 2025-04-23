<template>
  <div class="p-1 my-1">
    <div class="flex items-center">
      <div :style="{ width: labelWidth }" class="text-sm font-bold mr-1">
        <label v-if="label">{{ label }}</label>
      </div>
      <div
        class="flex-1"
        @focusout="handleInteraction('blur')"
        @input="handleInteraction('input')"
        @change="handleInteraction('change')"
      >
        <slot></slot>
      </div>
    </div>
    <div class="h-[1rem]">
      <transition
        enter-active-class="transition ease-out duration-300"
        enter-from-class="opacity-0 -translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition ease-in duration-200"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-2"
      >
        <!-- 使用 v-if 控制元素渲染 -->
        <div
          v-show="showError"
          :style="{ marginLeft: labelWidth }"
          class="truncate text-error text-sm"
          :title="error"
        >
          {{ error }}
        </div>
      </transition>
    </div>
  </div>
</template>
<script lang="ts" setup>

import type { FormItemProps } from './types'

import { computed, inject, ref, watch } from 'vue'

const props = defineProps<FormItemProps>()

const labelWidth = inject<string>('labelWidth', '')

const errors = inject<Record<string, string>>('errors', {})

const error = ref('')

watch(
  errors,
  (newError) => {
    error.value = newError[props.name]
  },
  { deep: true, immediate: true },
)

const interactionState = ref({
  blur: false,
  input: false,
  change: false,
})

// 事件处理函数，更新交互状态
const handleInteraction = (type: 'blur' | 'input' | 'change') => {
  interactionState.value[type] = true
}

// 计算属性，决定是否应该显示错误
const showError = computed(() => {
  // 首先，必须有错误信息存在
  if (!error.value) {
    return false
  }

  // 检查是否发生过任何一种交互
  const hasInteracted =
    interactionState.value.blur || interactionState.value.input || interactionState.value.change

  // 如果 trigger 是 'blur'，则仅在 blur 后显示
  if (props.trigger === 'blur') {
    return interactionState.value.blur && !!error.value
  }
  // 如果 trigger 是 'change'，则仅在 change 后显示
  if (props.trigger === 'change') {
    return interactionState.value.change && !!error.value
  }
  // 如果 trigger 是 'input'，则仅在 input 后显示
  if (props.trigger === 'input') {
    return interactionState.value.input && !!error.value
  }

  // 默认回退
  return hasInteracted && !!error.value
})
</script>
