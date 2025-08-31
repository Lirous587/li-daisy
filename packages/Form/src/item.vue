<template>
  <div class="p-1 my-1">
    <div class="flex gap-1.5" :class="alignClass">
      <div :style="widthStyle">
        <label v-if="label" class="li-form-item-label">{{ label }}</label>
      </div>
      <div
        :class="align === 'horizontal' ? 'flex-1' : 'w-full'"
        @focusout="handleInteraction('blur')"
        @input="handleInteraction('input')"
        @change="handleInteraction('change')"
      >
        <slot></slot>
      </div>
    </div>
    <div class="h-[1rem] mx-2">
      <transition
        enter-active-class="transition ease-out duration-200"
        enter-from-class="opacity-0 -translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition ease-in duration-200"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-2"
      >
        <!-- 使用 v-if 控制元素渲染 -->
        <div
          v-if="showError"
          :style="marginLeftStyle"
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

import { computed, inject, ref, watch, type Ref } from 'vue'

const props = withDefaults(defineProps<FormItemProps>(), {
  trigger: 'blur',
})

const labelWidth = inject<string>('labelWidth', '')

const align = inject<string>('align', 'horizontal')

const alignClass = computed(() => {
  if (props.align === 'horizontal') {
    return 'items-center'
  } else if (props.align === 'vertical') {
    return 'flex-col items-start'
  }
  if (align === 'horizontal') {
    return 'items-center'
  } else {
    return 'flex-col items-start'
  }
})

// label width
const widthStyle = computed(() => {
  if (align === 'horizontal' || props.align === 'horizontal') {
    return { width: labelWidth }
  }
  return {}
})

// error marginLeft
const marginLeftStyle = computed(() => {
  if (align === 'horizontal' || props.align === 'horizontal') {
    return { marginLeft: labelWidth }
  }
  return {}
})

const errors = inject<Record<string, string>>('errors', {})

const error = ref('')

watch(
  errors,
  (newError) => {
    if (props.name) {
      error.value = newError[props.name]
    }
  },
  { deep: true },
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

const isExecuteErrorAnimation = inject<Ref<boolean>>('isExecuteErrorAnimation', ref(false))

// 计算属性，决定是否应该显示错误
const showError = computed(() => {
  // 首先，必须有错误信息存在
  if (!error.value) {
    return false
  }

  // 如果验证被主动触发，直接显示错误，忽略交互条件
  if (isExecuteErrorAnimation.value) {
    return true
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

<style scoped>
.li-form-item-label {
  color: color-mix(in oklab, var(--color-base-100) 40%, var(--color-base-content) 60%);
}
</style>
