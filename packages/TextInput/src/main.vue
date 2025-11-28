<template>
  <!-- input -->
  <label class="input select-none w-full" :class="[inputSizeClass, inputColorClass]">
    <!-- prefix -->
    <div v-if="hasPrefix" class="h-full flex items-center justify-center" :class="textClass">
      <slot name="prefix" />
    </div>

    <input
      ref="inputRef"
      v-model="model"
      :type="passwordFieldType"
      :placeholder="placeholder"
      :maxlength="maxlength"
      :disabled="props.disabled"
      class="grow"
      :class="props.disabled ? '!cursor-not-allowed' : ''"
      :autocomplete="props.autocomplete"
      @blur="handleBlur"
      @input="handleInput"
      @focus="handleFocus"
    />

    <!-- eye -->
    <div
      v-if="props.type === 'password' && isEyeIconShow"
      class="join-item flex items-center cursor-pointer px-1 shrink-0"
      :class="textClass"
      @mousedown.prevent="togglePasswordVisibility"
    >
      <EyeIcon v-if="isPasswordVisible" class="w-4 h-4" />
      <EyeSlashIcon v-else class="w-4 h-4" />
    </div>

    <!-- search -->
    <div
      v-if="props.type === 'search' && isXIconShow"
      class="flex items-center cursor-pointer px-1 shrink-0"
      :class="textClass"
      @mousedown.prevent="clearSearch"
    >
      <XMarkIcon class="w-4 h-4" />
    </div>

    <!-- counter -->
    <div v-if="shouldShowCounter" class="flex items-center px-1" :class="textClass">
      {{ currentLength }}/{{ props.maxlength }}
    </div>

    <!-- suffix -->
    <div v-if="hasSuffix" class="h-full flex items-center justify-center" :class="textClass">
      <slot name="suffix" />
    </div>
  </label>
</template>

<script lang="ts" setup>
import { EyeIcon, EyeSlashIcon, XMarkIcon } from '@heroicons/vue/24/outline'

import type { TextInputProps } from './types'
import { computed, ref, useSlots } from 'vue'

const props = withDefaults(defineProps<TextInputProps>(), {
  type: 'text',
  placeholder: '',
  disabled: false,
  size: 'md',
  color: 'base',
  autocomplete: 'off',
})
const model = defineModel<string | number | undefined>('modelValue', {
  required: true,
})

const inputRef = ref<HTMLInputElement>()
const isPasswordVisible = ref(false)
const isEyeIconShow = ref(false)
const isXIconShow = ref(false)

const handleBlur = () => {
  isPasswordVisible.value = false
  isEyeIconShow.value = false
  isXIconShow.value = false
}

const handleFocus = () => {
  if (inputRef.value?.value === '') {
    isEyeIconShow.value = true
  }
}

const handleInput = () => {
  if (inputRef.value?.value === '') {
    isEyeIconShow.value = true
    isXIconShow.value = false
  } else {
    isXIconShow.value = true
  }
}

const togglePasswordVisibility = () => {
  isPasswordVisible.value = !isPasswordVisible.value
  inputRef.value?.focus()
}

const passwordFieldType = computed(() => {
  if (props.type !== 'password') {
    return props.type
  }
  return isPasswordVisible.value ? 'text' : 'password'
})

const clearSearch = () => {
  if (inputRef.value) {
    inputRef.value.value = ''
  }
}

const slots = useSlots()
const hasPrefix = computed(() => !!slots.prefix)
const hasSuffix = computed(() => !!slots.suffix)

const inputSizeClass = computed(() => {
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
      return 'input-sm'
  }
})

const inputColorClass = computed(() => {
  if (props.disabled) return ''
  switch (props.color) {
    case 'base':
      return 'input'
    case 'neutral':
      return 'input-neutral'
    case 'primary':
      return 'input-primary'
    case 'secondary':
      return 'input-secondary'
    case 'accent':
      return 'input-accent'
    case 'info':
      return 'input-info'
    case 'success':
      return 'input-success'
    case 'warning':
      return 'input-warning'
    case 'error':
      return 'input-error'
    default:
      return 'input'
  }
})

const textClass = computed(() => {
  return [textColor.value, textColorOpacity.value]
})

const textColor = computed(() => {
  switch (props.color) {
    case 'base':
      return 'text-base-content'
    case 'neutral':
      return 'text-neutral'
    case 'primary':
      return 'text-primary'
    case 'secondary':
      return 'text-secondary'
    case 'accent':
      return 'text-accent'
    case 'info':
      return 'text-info'
    case 'success':
      return 'text-success'
    case 'warning':
      return 'text-warning'
    case 'error':
      return 'text-error'
    default:
      return 'text-base-content'
  }
})

const textColorOpacity = computed(() => {
  return props.disabled ? 'opacity-60' : ''
})

// 计算当前输入的长度
const currentLength = computed<number>(() => {
  return String(model.value ?? '').length
})

// 判断是否应该显示计数器：有maxlength且是基于文本的输入框
const shouldShowCounter = computed<boolean>(() => {
  return props.maxlength !== undefined
})
</script>
