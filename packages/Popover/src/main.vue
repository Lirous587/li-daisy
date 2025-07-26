<template>
  <div ref="triggerRef" class="inline-block">
    <!-- 触发器插槽 -->
    <slot name="trigger" />

    <!-- 悬浮内容 -->
    <Teleport to="body">
      <div
        ref="popoverRef"
        class="absolute transition-[scale] duration-300 vp-raw"
        :class="visible ? 'opacity-100' : 'opacity-0 scale-90'"
        :style="popoverStyle"
        @mouseenter="handleMouseEnter(false)"
        @mouseleave="handleMouseLeave"
      >
        <!-- 内容插槽 -->
        <slot name="content" />
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, type CSSProperties, nextTick } from 'vue'
import type { PopoverProps, Positon, PopoverRef } from './types'
import { debounce } from '../../utils/performance'

const props = withDefaults(defineProps<PopoverProps>(), {
  positon: 'bottom',
  trigger: 'hover',
  closeOnClickOutside: true,
  closeOnEscape: true,
})

const emit = defineEmits<{
  show: []
  hide: []
  toggle: [visible: boolean]
}>()

const triggerRef = ref<HTMLElement>()
const popoverRef = ref<HTMLElement>()
const visible = ref(false)

const offset = 12
const margin = 8

// 计算所有可能的位置
const calculatePosition = (position: Positon, triggerRect: DOMRect, popoverRect: DOMRect) => {
  const positions: Record<Positon, { x: number; y: number }> = {
    // Top positions
    top: {
      x: triggerRect.left + triggerRect.width / 2 - popoverRect.width / 2,
      y: triggerRect.top - popoverRect.height - offset,
    },
    'top-start': {
      x: triggerRect.left,
      y: triggerRect.top - popoverRect.height - offset,
    },
    'top-end': {
      x: triggerRect.right - popoverRect.width,
      y: triggerRect.top - popoverRect.height - offset,
    },

    // Bottom positions
    bottom: {
      x: triggerRect.left + triggerRect.width / 2 - popoverRect.width / 2,
      y: triggerRect.bottom + offset,
    },
    'bottom-start': {
      x: triggerRect.left,
      y: triggerRect.bottom + offset,
    },
    'bottom-end': {
      x: triggerRect.right - popoverRect.width,
      y: triggerRect.bottom + offset,
    },

    // Left positions
    left: {
      x: triggerRect.left - popoverRect.width - offset,
      y: triggerRect.top + triggerRect.height / 2 - popoverRect.height / 2,
    },
    'left-start': {
      x: triggerRect.left - popoverRect.width - offset,
      y: triggerRect.top,
    },
    'left-end': {
      x: triggerRect.left - popoverRect.width - offset,
      y: triggerRect.bottom - popoverRect.height,
    },

    // Right positions
    right: {
      x: triggerRect.right + offset,
      y: triggerRect.top + triggerRect.height / 2 - popoverRect.height / 2,
    },
    'right-start': {
      x: triggerRect.right + offset,
      y: triggerRect.top,
    },
    'right-end': {
      x: triggerRect.right + offset,
      y: triggerRect.bottom - popoverRect.height,
    },
  }

  return positions[position]
}

// 检查位置是否在视口内
const isInViewport = (x: number, y: number, width: number, height: number) => {
  // 检查一个矩形区域（弹出框）是否完全在浏览器窗口的可视范围内，并且距离边缘至少有 8px 的安全距离
  return (
    x >= margin && // 左边界检查
    y >= margin && // 上边界检查
    x + width <= window.innerWidth - margin && // 右边界检查
    y + height <= window.innerHeight - margin // 下边界检查
  )
}

// 获取最佳位置
const getBestPosition = (triggerRect: DOMRect, popoverRect: DOMRect) => {
  // 简单回退配置
  const getSimpleFallbacks = (positon: Positon): Positon[] => {
    const base = positon.split('-')[0] as 'top' | 'bottom' | 'left' | 'right'
    const opposite = { top: 'bottom', bottom: 'top', left: 'right', right: 'left' }

    return [
      positon, // 首选位置
      opposite[base] as Positon, // 对面位置
      'bottom', // 默认回退
    ]
  }

  // 位置优先级，如果首选位置不可用，按此顺序尝试
  const positions = getSimpleFallbacks(props.positon)

  // 尝试找到完全在视口内的位置
  for (const positon of positions) {
    const pos = calculatePosition(positon, triggerRect, popoverRect)
    if (pos && isInViewport(pos.x, pos.y, popoverRect.width, popoverRect.height)) {
      return { ...pos }
    }
  }

  // 如果所有预设位置都不合适，进行智能调整
  const preferredPos = calculatePosition(props.positon, triggerRect, popoverRect)

  // 限制在视口内即可
  const adjustedX = Math.max(
    margin,
    Math.min(preferredPos.x, window.innerWidth - popoverRect.width - margin),
  )

  const adjustedY = Math.max(
    margin,
    Math.min(preferredPos.y, window.innerHeight - popoverRect.height - margin),
  )
  return {
    x: adjustedX,
    y: adjustedY,
  }
}

// 获取真实尺寸（处理scale缩放）
const getRealRect = (element: HTMLElement): DOMRect => {
  const rect = element.getBoundingClientRect()

  return {
    ...rect,
    width: rect.width / 0.9,
    height: rect.height / 0.9,
  } as DOMRect
}

// 计算悬浮框样式
const popoverStyle = computed((): CSSProperties => {
  forceUpdate.value

  if (!triggerRef.value || !popoverRef.value) {
    return {
      pointerEvents: 'none',
      visibility: 'hidden',
      left: '-9999px',
      top: '-9999px',
    }
  }

  const triggerRect = triggerRef.value.getBoundingClientRect()

  if (!visible.value) {
    return {
      pointerEvents: 'none',
      visibility: 'hidden',
      left: '-9999px',
      top: '-9999px',
    }
  }
  const popoverRect = getRealRect(popoverRef.value)

  const position = getBestPosition(triggerRect, popoverRect)

  return {
    left: `${position.x + window.scrollX}px`,
    top: `${position.y + window.scrollY}px`,
    'z-index': props.zIndex || 0,
    visibility: 'visible',
  }
})

// 显示悬浮框
const show = async () => {
  visible.value = true

  await nextTick()
  updatePosition()

  emit('show')
  emit('toggle', true)
}

// 隐藏悬浮框
const hide = () => {
  visible.value = false
  emit('hide')
  emit('toggle', false)
}

// 切换显示状态
const toggle = () => {
  if (visible.value) {
    hide()
  } else {
    show()
  }
}

let hoverTimer: number | null = null

const handleMouseEnter = (shouldShow = false) => {
  if (props.trigger === 'hover') {
    if (hoverTimer) {
      clearTimeout(hoverTimer)
      hoverTimer = null
    }
    if (shouldShow) {
      show()
    }
  }
}

const handleMouseLeave = () => {
  if (props.trigger === 'hover') {
    hoverTimer = setTimeout(() => {
      hide()
    }, 100)
  }
}

// 处理触发器事件
const handleTriggerMouseEnter = () => handleMouseEnter(true)
const handleTriggerMouseLeave = handleMouseLeave
const handleTriggerClick = () => {
  if (props.trigger === 'click') {
    toggle()
  }
}

// 点击外部关闭
const handleClickOutside = (event: MouseEvent) => {
  if (!props.closeOnClickOutside || !visible.value) return

  const target = event.target as Node
  // contains用于检测元素是否为触发器或弹出框的后代元素
  const isClickInsideTrigger = triggerRef.value?.contains(target)
  const isClickInsidePopover = popoverRef.value?.contains(target)

  if (!isClickInsideTrigger && !isClickInsidePopover) {
    hide()
  }
}

// ESC 键关闭
const handleEscapeKey = (event: KeyboardEvent) => {
  if (props.closeOnEscape && event.key === 'Escape' && visible.value) {
    hide()
  }
}

// 用于强制更新
const forceUpdate = ref(0)

// 重新计算位置
const updatePosition = () => {
  if (visible.value) {
    forceUpdate.value++
  }
}

const debouncedUpdatePosition = debounce(updatePosition, 100)

// 事件监听
onMounted(() => {
  if (triggerRef.value) {
    triggerRef.value.addEventListener('click', handleTriggerClick)
    triggerRef.value.addEventListener('mouseenter', handleTriggerMouseEnter)
    triggerRef.value.addEventListener('mouseleave', handleTriggerMouseLeave)
  }

  document.addEventListener('click', handleClickOutside)
  document.addEventListener('keydown', handleEscapeKey)
  window.addEventListener('resize', debouncedUpdatePosition)
})

onUnmounted(() => {
  if (triggerRef.value) {
    triggerRef.value.removeEventListener('click', handleTriggerClick)
    triggerRef.value.removeEventListener('mouseenter', handleTriggerMouseEnter)
    triggerRef.value.removeEventListener('mouseleave', handleTriggerMouseLeave)
  }

  document.removeEventListener('click', handleClickOutside)
  document.removeEventListener('keydown', handleEscapeKey)
  window.removeEventListener('resize', debouncedUpdatePosition)

  if (hoverTimer) {
    clearTimeout(hoverTimer)
  }
})

defineExpose<PopoverRef>({
  show,
  hide,
  toggle,
  visible: computed(() => visible.value),
})
</script>
