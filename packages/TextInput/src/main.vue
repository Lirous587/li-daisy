<template>
  <div :class="props.disabled ? 'hover:cursor-not-allowed pointer-events-none' : ''">
    <!-- input -->
    <label
      class="input flex-1 overflow-hidden relative w-full select-none"
      :class="[inputSizeClass, inputColorClass, hasPrefix ? '!pl-0' : '', hasSuffix ? '!pr-0' : '']"
    >
      <div v-if="props.disabled" class="absolute inset-0 bg-base-300/70 z-1"></div>

      <!-- prefix -->
      <div
        v-if="hasPrefix"
        class="h-full flex items-center justify-center border-r px-2"
        :class="[slotBorderClass, slotBgClass, slotTextColorClass]"
      >
        <slot name="prefix" />
      </div>

      <input
        ref="inputRef"
        v-model="model"
        :type="passwordFieldType"
        :placeholder="placeholder"
        :maxlength="maxlength"
        @blur="handleBlur"
        @input="handleInput"
        @focus="handleFocus"
      />

      <!-- eye -->
      <div
        v-if="props.type === 'password' && isEyeIconShow"
        class="join-item flex items-center text-base-content/70 hover:text-base-content cursor-pointer px-1 shrink-0"
        @mousedown.prevent="togglePasswordVisibility"
      >
        <EyeIcon v-if="isPasswordVisible" class="w-4 h-4" />
        <EyeSlashIcon v-else class="w-4 h-4" />
      </div>

      <!-- search -->
      <div
        v-if="props.type === 'search' && isXIconShow"
        class="flex items-center text-base-content/70 hover:text-base-content cursor-pointer px-1 shrink-0"
        @mousedown.prevent="clearSearch"
      >
        <XMarkIcon class="w-4 h-4" />
      </div>

      <!-- counter -->
      <div v-if="shouldShowCounter" class="flex items-center text-base-content px-1">
        {{ currentLength }}/{{ props.maxlength }}
      </div>

      <!-- suffix -->
      <div
        v-if="hasSuffix"
        class="h-full flex items-center justify-center border-l px-2"
        :class="[slotBorderClass, slotBgClass, slotTextColorClass]"
      >
        <slot name="suffix" />
      </div>
    </label>
  </div>
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
})
const model = defineModel<string | undefined>('modelValue', {
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
      return 'input-xs'
  }
})

const inputColorClass = computed(() => {
  if (props.disabled) return ''
  switch (props.color) {
    case 'base':
      return 'input-base'
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
      return 'input-base'
  }
})

const slotBorderClass = computed(() => {
  if (props.disabled) return 'border-none'
  switch (props.color) {
    case 'base':
      return 'border-base-300'
    case 'neutral':
      return 'border-neutral'
    case 'primary':
      return 'border-primary'
    case 'secondary':
      return 'border-secondary'
    case 'accent':
      return 'border-accent'
    case 'info':
      return 'border-info'
    case 'success':
      return 'border-success'
    case 'warning':
      return 'border-warning'
    case 'error':
      return 'border-error'
    default:
      return 'border-base-300'
  }
})

const slotBgClass = computed(() => {
  switch (props.color) {
    case 'base':
      return 'bg-base-200'
    case 'neutral':
      return 'bg-neutral/10'
    case 'primary':
      return 'bg-primary/10'
    case 'secondary':
      return 'bg-secondary/10'
    case 'accent':
      return 'bg-accent/10'
    case 'info':
      return 'bg-info/10'
    case 'success':
      return 'bg-success/10'
    case 'warning':
      return 'bg-warning/10'
    case 'error':
      return 'bg-error/10'
    default:
      return 'bg-base-200'
  }
})

const slotTextColorClass = computed(() => {
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

// 计算当前输入的长度
const currentLength = computed<number>(() => {
  return String(model.value ?? '').length
})

// 判断是否应该显示计数器：有maxlength且是基于文本的输入框
const shouldShowCounter = computed<boolean>(() => {
  return props.maxlength !== undefined
})
</script>

<style scoped>
.input-base {
  & {
    --input-color: color-mix(in oklab, var(--color-base-content) 20%, #0000);
  }
  &:focus,
  &:focus-within {
    --input-color: var(--color-info);
  }
}
.input {
  transition:
    border-color 0.2s,
    box-shadow 0.2s,
    outline-color 0.2s;
}
</style>
