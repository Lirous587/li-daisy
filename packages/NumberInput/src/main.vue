<template>
  <div class="li-join" :class="props.disabled ? '!cursor-not-allowed' : ''">
    <!-- reduce -->
    <button
      class="li-btn li-btn-outline li-btn-square li-join-item"
      :disabled="props.disabled"
      :class="[operationBtnSize, operationBtnColor]"
      aria-label="decrease"
      @click="decrease"
    >
      <MinusIcon class="p-[25%]" />
    </button>

    <input
      ref="inputRef"
      v-model="model"
      type="number"
      :disabled="props.disabled"
      class="li-input li-join-item shadow-none is-active"
      :class="[inputSize, inputColor]"
      :placeholder="props.placeholder"
      :min="props.min"
      :max="props.max"
    />
    <!-- plus -->
    <button
      class="li-btn li-btn-outline li-btn-square li-join-item"
      :disabled="props.disabled"
      :class="[operationBtnSize, operationBtnColor]"
      aria-label="increase"
      @click="increase"
    >
      <PlusIcon class="p-[25%]" />
    </button>
  </div>
</template>

<script lang="ts" setup>
import type { NumberInputProps } from './types'
import { computed, onMounted, ref, watch } from 'vue'
import { PlusIcon, MinusIcon } from '@heroicons/vue/24/outline'

const props = withDefaults(defineProps<NumberInputProps>(), {
  min: 0,
  placeholder: '',
  disabled: false,
  size: 'md',
  color: 'base',
})

const model = defineModel<number | undefined>('modelValue', {
  required: true,
})

const clamp = (val: number | undefined, min?: number, max?: number) => {
  if (!Number.isFinite(Number(val))) return val
  let v = Number(val)
  if (min !== undefined && v < min) v = min
  if (max !== undefined && v > max) v = max
  return v
}

onMounted(() => {
  // 如果有初始值，做边界限制；否则设置为 props.min
  if (model.value === undefined || model.value === null || !Number.isFinite(Number(model.value))) {
    model.value = props.min
    return
  }
  const clamped = clamp(model.value, props.min, props.max)
  if (clamped !== model.value) model.value = clamped as number
})

watch(
  model,
  newValue => {
    // 若不是数字则不处理
    if (newValue === undefined || newValue === null) return
    const clamped = clamp(newValue, props.min, props.max)
    if (clamped !== newValue) {
      model.value = clamped as number
    }
  },
  { immediate: false }
)

const inputRef = ref<HTMLInputElement>()

const inputColor = computed(() => {
  if (props.disabled) return ''
  switch (props.color) {
    case 'base':
      return 'li-input-base'
    case 'neutral':
      return 'li-input-neutral'
    case 'primary':
      return 'li-input-primary'
    case 'secondary':
      return 'li-input-secondary'
    case 'accent':
      return 'li-input-accent'
    case 'info':
      return 'li-input-info'
    case 'success':
      return 'li-input-success'
    case 'warning':
      return 'li-input-warning'
    case 'error':
      return 'li-input-error'
    default:
      return 'li-input-base'
  }
})

const inputSize = computed(() => {
  switch (props.size) {
    case 'xs':
      return 'li-input-xs'
    case 'sm':
      return 'li-input-sm'
    case 'md':
      return 'li-input-md'
    case 'lg':
      return 'li-input-lg'
    case 'xl':
      return 'li-input-xl'
    default:
      return 'li-input-sm'
  }
})

const operationBtnSize = computed(() => {
  switch (props.size) {
    case 'xs':
      return 'li-btn-xs'
    case 'sm':
      return 'li-btn-sm'
    case 'md':
      return 'li-btn-md'
    case 'lg':
      return 'li-btn-lg'
    case 'xl':
      return 'li-btn-xl'
    default:
      return 'li-btn-sm'
  }
})

const operationBtnColor = computed(() => {
  if (props.disabled) return ''
  switch (props.color) {
    case 'base':
      return 'li-input-base'
    case 'neutral':
      return 'li-btn-neutral'
    case 'primary':
      return 'li-btn-primary'
    case 'secondary':
      return 'li-btn-secondary'
    case 'accent':
      return 'li-btn-accent'
    case 'info':
      return 'li-btn-info'
    case 'success':
      return 'li-btn-success'
    case 'warning':
      return 'li-btn-warning'
    case 'error':
      return 'li-btn-error'
    default:
      return 'li-input-base'
  }
})

const decrease = () => {
  const currentValue = Number(model.value) || 0
  if (props.min !== undefined && currentValue <= props.min) return
  model.value = currentValue - 1
}

const increase = () => {
  const currentValue = Number(model.value) || 0
  if (props.max !== undefined && currentValue >= props.max) return
  model.value = currentValue + 1
}
</script>

<style scoped>
.li-input-base {
  & {
    --input-color: color-mix(in oklab, var(--color-base-content) 20%, #0000);
  }
  &:focus,
  &:focus-within,
  &.is-active {
    --input-color: var(--color-info);
  }
}
.li-input-base.is-active {
  --li-input-color: var(--color-base-content);
  z-index: 1;
}
</style>
