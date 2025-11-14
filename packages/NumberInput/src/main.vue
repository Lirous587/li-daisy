<template>
  <div class="li-join" :class="props.disabled ? '!cursor-not-allowed' : ''">
    <!-- reduce -->
    <button
      class="li-btn li-btn-outline li-btn-square li-join-item"
      :disabled="props.disabled"
      :class="[operationBtnSize, operationBtnColor]"
    >
      <MinusIcon class="p-[25%]" @click="decrease" />
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
    >
      <PlusIcon class="p-[25%]" @click="increase" />
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

onMounted(() => {
  model.value = props.min
})

watch(model, newValue => {
  if (props.min) {
    if (newValue) {
      if (newValue <= props.min) {
        model.value = props.min
      }
    }
  }
  if (props.max) {
    if (newValue) {
      if (newValue >= props.max) {
        model.value = props.max
      }
    }
  }
})

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
  let currentValue = model.value || 0
  // 确保不小于最小值
  if (props.min && currentValue <= props.min) {
    return
  }
  currentValue -= 1
  model.value = currentValue
}

const increase = () => {
  let currentValue = model.value || 0
  // 确保不大于最大值
  if (props.max && currentValue >= props.max) {
    return
  }
  currentValue += 1
  model.value = currentValue
}

onMounted(() => {
  model.value = props.min
})
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
