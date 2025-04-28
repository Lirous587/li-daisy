<template>
  <div :class="props.disabled ? 'hover:cursor-not-allowed' : ''">
    <div class="w-full join justify-center" :class="[props.disabled ? 'pointer-events-none' : '']">
      <button
        class="btn btn-soft join-item rounded-l-full"
        :class="[btnSizeClass, btnColorClass]"
        @click="decrease"
      >
        -
      </button>
      <input
        ref="inputRef"
        type="number"
        v-model="value"
        class="px-2.5 input join-item"
        :class="[inputSizeClass, inputColorClass]"
        :placeholder="props.placeholder"
        :min="props.min"
        :max="props.max"
        :disabled="props.disabled"
      />
      <button
        class="btn btn-soft join-item rounded-r-full"
        :class="[btnSizeClass, btnColorClass]"
        @click="increase"
      >
        +
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { NumberInputProps } from './types'
import { computed, onMounted, ref, watch } from 'vue'

const props = withDefaults(defineProps<NumberInputProps>(), {
  placeholder: '',
  disabled: false,
  size: 'md',
})

const value = defineModel<number>()

onMounted(() => {
  value.value = props.min
})

watch(value, (newValue) => {
  if (props.min) {
    if (newValue) {
      if (newValue <= props.min) {
        value.value = props.min
      }
    }
  }
  if (props.max) {
    if (newValue) {
      if (newValue >= props.max) {
        value.value = props.max
      }
    }
  }
})

const inputRef = ref<HTMLInputElement>()

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

const decrease = () => {
  let currentValue = value.value || 0
  // 确保不小于最小值
  if (props.min && currentValue <= props.min) {
    return
  }
  currentValue -= 1
  value.value = currentValue
}

const increase = () => {
  let currentValue = value.value || 0
  // 确保不大于最大值
  if (props.max && currentValue >= props.max) {
    return
  }
  currentValue += 1
  value.value = currentValue
}
</script>
