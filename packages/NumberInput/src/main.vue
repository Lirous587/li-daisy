<template>
  <div :class="props.disabled ? 'hover:cursor-not-allowed pointer-events-none' : ''">
    <!-- input -->
    <label
      class="input flex-1 overflow-hidden relative !px-0 w-full"
      :class="[sizeClass, inputColorClass]"
    >
      <div class="absolute inset-0 bg-base-300/70 z-1" v-if="props.disabled"></div>

      <!-- reduce -->
      <div
        class="h-full flex items-center justify-center hover:cursor-pointer border-r aspect-square select-none"
        :class="[operationBorderClass, operationBgClass, operationTextColorClass]"
        @click="decrease"
      >
        -
      </div>

      <input
        ref="inputRef"
        type="number"
        v-model="model"
        :class="[inputColorClass]"
        :placeholder="props.placeholder"
        :min="props.min"
        :max="props.max"
      />

      <!-- plus -->
      <div
        class="h-full flex items-center justify-center hover:cursor-pointer border-l aspect-square select-none"
        :class="[operationBorderClass, operationBgClass, operationTextColorClass]"
        @click="increase"
      >
        +
      </div>
    </label>
  </div>
</template>

<script lang="ts" setup>
import type { NumberInputProps } from './types'
import { computed, onMounted, ref, watch } from 'vue'

const props = withDefaults(defineProps<NumberInputProps>(), {
  min: 0,
  placeholder: '',
  disabled: false,
  size: 'sm',
  color: 'info',
})

const model = defineModel<number | undefined>('modelValue', {
  required: true,
})

onMounted(() => {
  model.value = props.min
})

watch(model, (newValue) => {
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
  }
})

const operationBorderClass = computed(() => {
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
  }
})

const operationBgClass = computed(() => {
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
  }
})

const operationTextColorClass = computed(() => {
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
  }
})

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
      return 'input-xs'
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
</script>

<style scoped>
.input-base {
  &,
  &:focus,
  &:focus-within {
    --input-color: var(--color-base-300);
  }
}
</style>
