<template>
  <div class="join" :class="props.disabled ? '!cursor-not-allowed' : ''">
    <!-- reduce -->
    <button
      class="btn btn-outline btn-square join-item"
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
      class="input join-item shadow-none is-active"
      :class="[inputSize, inputColor]"
      :placeholder="props.placeholder"
      :min="props.min"
      :max="props.max"
    />
    <!-- plus -->
    <button
      class="btn btn-outline btn-square join-item"
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

const inputSize = computed(() => {
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

const operationBtnSize = computed(() => {
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
      return 'btn-sm'
  }
})

const operationBtnColor = computed(() => {
  if (props.disabled) return ''
  switch (props.color) {
    case 'base':
      return 'input-base'
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
      return 'input-base'
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
.input-base {
  & {
    --input-color: color-mix(in oklab, var(--color-base-content) 20%, #0000);
  }
  &:focus,
  &:focus-within,
  &.is-active {
    --input-color: var(--color-info);
  }
}
.input-base.is-active {
  --input-color: var(--color-base-content);
  z-index: 1;
}
</style>
