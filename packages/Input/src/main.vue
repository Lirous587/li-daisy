<template>
  <div class="w-full" :class="props.disabled ? 'hover:cursor-not-allowed' : ''">
    <label
      class="input w-full px-0"
      :class="[sizeClass, props.disabled ? 'pointer-events-none' : '']"
    >
      <div
        v-if="hasPrefix"
        class="h-full flex items-center justify-center px-2 border-r border-base-300"
      >
        <slot name="prefix" />
      </div>

      <input
        v-model="value"
        :type="props.type"
        :placeholder="placeholder"
        :maxlength="maxlength"
        :disabled="props.disabled"
        class="px-2.5"
      />
      <div v-if="shouldShowCounter" class="flex items-center text-base-content px-1">
        {{ currentLength }}/{{ props.maxlength }}
      </div>

      <div
        v-if="hasSuffix"
        class="h-full flex items-center justify-center px-2 border-l border-base-300"
      >
        <slot name="suffix" />
      </div>
    </label>
  </div>
</template>

<script lang="ts" setup>
import type { InputProps } from './types'
import { computed, useSlots } from 'vue'

const props = withDefaults(defineProps<InputProps>(), {
  type: 'text',
  placeholder: '',
  disabled: false,
  size: 'md',
})

const value = defineModel<string>({
  default: '',
})

const slots = useSlots()
const hasPrefix = computed(() => !!slots.prefix)
const hasSuffix = computed(() => !!slots.suffix)

const sizeClass = computed(() => {
  switch (props.size) {
    case 'xs':
      return 'input-xs'
    case 'sm':
      return 'input-sm'
    case 'md':
      return 'input-md'
    case 'lg':
      return 'input-lg'
    case 'xl':
      return 'input-xl'
    default:
      return 'input-md'
  }
})

const textBasedInputTypes: string[] = ['text', 'password', 'email', 'search', 'tel', 'url']

// 计算当前输入的长度
const currentLength = computed<number>(() => {
  // 由于shouldShowCounter确保了只有文本类型的输入才会调用此计算属性
  // 所以可以直接处理为字符串类型
  if (value.value === undefined || value.value === null) {
    return 0
  }

  return String(value.value).length
})

// 判断是否应该显示计数器：有maxlength且是基于文本的输入框
const shouldShowCounter = computed<boolean>(() => {
  return props.maxlength !== undefined && textBasedInputTypes.includes(props.type)
})
</script>
