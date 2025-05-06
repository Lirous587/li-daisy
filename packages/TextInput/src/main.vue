<template>
  <div :class="props.disabled ? 'hover:cursor-not-allowed' : ''">
    <div class="w-full join">
      <!-- prefix -->
      <div
        v-if="hasPrefix"
        class="btn btn-soft join-item rounded-l-full"
        :class="[btnSizeClass, btnColorClass]"
      >
        <slot name="prefix" />
      </div>
      <!-- input -->
      <label
        class="input validator join-item flex-1"
        :class="[inputSizeClass, inputColorClass, props.disabled ? 'pointer-events-none' : '']"
      >
        <input
          ref="inputRef"
          v-model="value"
          :type="passwordFieldType"
          :placeholder="placeholder"
          :maxlength="maxlength"
          :disabled="props.disabled"
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
      </label>
      <!-- suffix -->
      <div
        v-if="hasSuffix"
        class="btn btn-soft join-item rounded-r-full"
        :class="[btnSizeClass, btnColorClass]"
      >
        <slot name="suffix" />
      </div>
    </div>
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
})

const value = defineModel<string>({
  default: '',
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
      return 'input-md'
  }
})

const inputColorClass = computed(() => {
  switch (props.color) {
    case 'ghost':
      return 'input-ghost'
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
      return ''
  }
})

const btnSizeClass = computed(() => {
  switch (props.size) {
    case 'xs':
      return 'btn-xs'
    case 'sm':
      return 'btn-sm'
    case 'md':
      return 'btn-md'
    case 'lg':
      return 'btn-lg'
    case 'xl':
      return 'btn-xl'
    default:
      return 'btn-md'
  }
})
const btnColorClass = computed(() => {
  switch (props.color) {
    case 'ghost':
      return 'btn-ghost'
    case 'neutral':
      return 'btn-neutral'
    case 'primary':
      return 'btn-primary'
    case 'secondary':
      return 'btn-secondary'
    case 'accent':
      return 'btn-accent'
    case 'info':
      return 'btn-info'
    case 'success':
      return 'btn-success'
    case 'warning':
      return 'btn-warning'
    case 'error':
      return 'btn-error'
    default:
      return ''
  }
})

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
  return props.maxlength !== undefined
})
</script>
