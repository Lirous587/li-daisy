<template>
  <div
    class="select-none w-full relative"
    :class="props.disabled ? 'hover:cursor-not-allowed' : ''"
  >
    <textarea
      ref="textareaEl"
      v-model="model"
      :placeholder="props.placeholder"
      :disabled="props.disabled"
      :maxlength="props.maxlength"
      :rows="dynamicRows"
      class="li-textarea min-h-0 w-full scrollbar-xs leading-[calc(1em+8px)]"
      :class="[sizeClass, colorClass, props.disabled ? 'pointer-events-none !border-base-300' : '']"
      :style="{ minHeight: minHeightPx }"
    ></textarea>

    <div v-if="maxlength" class="absolute right-2.5 bottom-2.5 text-sm text-base-content/70">
      {{ currentLength }}/{{ maxlength }}
    </div>

    <!-- 隐藏的测量元素 -->
    <div
      ref="measureEl"
      class="absolute top-0 left-0 w-full invisible opacity-0 whitespace-pre-wrap break-words overflow-hidden pointer-events-none"
    ></div>
  </div>
</template>

<script lang="ts" setup>
import { isServer } from '../../utils/ssr'
import type { TextareaProps } from './types'
import { computed, nextTick, onMounted, ref, watch } from 'vue'

const props = withDefaults(defineProps<TextareaProps>(), {
  disabled: false,
  minRows: 5,
  maxRows: 10,
  size: 'sm',
  color: 'base',
})

const model = defineModel<string | undefined>('modelValue', {
  required: true,
})

const sizeClass = computed(() => {
  switch (props.size) {
    case 'xs':
      return 'li-textarea-xs'
    case 'sm':
      return 'li-textarea-sm'
    case 'md':
      return 'li-textarea-md'
    case 'lg':
      return 'li-textarea-lg'
    case 'xl':
      return 'li-textarea-xl'
    default:
      return 'li-textarea-sm'
  }
})

const colorClass = computed(() => {
  switch (props.color) {
    case 'base':
      return 'li-textarea-base'
    case 'neutral':
      return 'li-textarea-neutral'
    case 'primary':
      return 'li-textarea-primary'
    case 'secondary':
      return 'li-textarea-secondary'
    case 'accent':
      return 'li-textarea-accent'
    case 'info':
      return 'li-textarea-info'
    case 'success':
      return 'li-textarea-success'
    case 'warning':
      return 'li-textarea-warning'
    case 'error':
      return 'li-textarea-error'
    default:
      return 'li-textarea-base'
  }
})

const currentLength = computed<number>(() => {
  return String(model.value ?? '').length
})

const minHeightPx = ref('')

// 实际文本域
const textareaEl = ref<HTMLTextAreaElement | null>(null)
// 隐藏的测量元素
const measureEl = ref<HTMLElement | null>(null)

const dynamicRows = ref(props.minRows)

const calculateRows = async () => {
  // 仅当 autoGrow 启用，且在浏览器环境，且 refs 都准备好时执行
  // 否则不计算
  if (isServer() || !measureEl.value || !textareaEl.value) {
    dynamicRows.value = props.minRows || 5
    return
  }

  // 等待 DOM 更新完成
  await nextTick()

  const minRows = props.minRows
  const maxRows = props.maxRows

  // 1. 同步样式 (确保测量元素与 textarea 样式一致)
  const computedStyle = window.getComputedStyle(textareaEl.value)
  measureEl.value.style.font = computedStyle.font
  measureEl.value.style.letterSpacing = computedStyle.letterSpacing
  measureEl.value.style.padding = computedStyle.padding // 同步 padding
  measureEl.value.style.width = computedStyle.width // 同步宽度
  measureEl.value.style.border = computedStyle.border // 同步边框
  measureEl.value.style.boxSizing = computedStyle.boxSizing // 同步box-sizing

  // 2. 设置内容并测量
  // 使用空格确保至少有一行的高度，防止空内容时 scrollHeight 为 0
  const textContent = String(model.value) || ' '
  measureEl.value.textContent = textContent

  // 3. 计算高度和行高
  const lineHeight = parseFloat(computedStyle.lineHeight)
  if (isNaN(lineHeight)) {
    // 处理 lineHeight 为 'normal' 的情况
    console.warn(
      "Cannot calculate rows: textarea line-height is 'normal'. Falling back to minRows."
    )
    dynamicRows.value = minRows
    return
  }

  // scrollHeight 在 border-box 下包含 padding 和 border
  const scrollHeight = measureEl.value.scrollHeight

  // 简化计算：直接用 scrollHeight 除以行高通常足够接近
  const calculatedRows = Math.round(scrollHeight / lineHeight)

  // 4. 应用 min/max 约束并更新 ref
  dynamicRows.value = Math.min(Math.max(calculatedRows, minRows), maxRows)

  // 5.清空测量元素的内容
  measureEl.value.textContent = ' '
}

// 计算一行高度并设置 minHeight
const updateMinHeight = () => {
  if (!textareaEl.value) return
  const computedStyle = window.getComputedStyle(textareaEl.value)
  let lineHeight = parseFloat(computedStyle.lineHeight)
  let paddingTop = parseFloat(computedStyle.paddingTop)
  let paddingBottom = parseFloat(computedStyle.paddingBottom)

  if (isNaN(lineHeight)) lineHeight = 24 // fallback
  if (isNaN(paddingTop)) paddingTop = 0
  if (isNaN(paddingBottom)) paddingBottom = 0
  minHeightPx.value = `${lineHeight * props.minRows + paddingTop + paddingBottom}px`
}

watch(model, calculateRows)

watch(() => props.minRows, updateMinHeight)

watch(
  () => props.size,
  () => {
    calculateRows()
    updateMinHeight()
  }
)

onMounted(() => {
  calculateRows()
  updateMinHeight()
})
</script>

<style scoped>
.li-textarea-base {
  & {
    --input-color: color-mix(in oklab, var(--color-base-content) 20%, #0000);
  }
  &:focus,
  &:focus-within {
    --input-color: var(--color-info);
  }
}
.li-input {
  transition:
    border-color 0.2s,
    box-shadow 0.2s,
    outline-color 0.2s;
}
</style>
