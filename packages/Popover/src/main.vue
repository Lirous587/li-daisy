<template>
  <div ref="triggerRef" class="inline-block">
    <!-- 触发器插槽 -->
    <slot name="trigger" />

    <!-- 悬浮内容 -->
    <CompatiblePortal to="body">
      <div
        ref="popoverRef"
        class="absolute transition-[scale] vp-raw"
        :class="visible ? 'opacity-100' : 'opacity-0 scale-90'"
        :style="[popoverStyle, { transitionDuration: props.duration + 'ms' }]"
        @mouseenter="handleMouseEnter(false)"
        @mouseleave="handleMouseLeave"
      >
        <!-- 内容插槽 -->
        <slot name="content" />
      </div>
    </CompatiblePortal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, type CSSProperties, nextTick } from 'vue'
import CompatiblePortal from '../../ssr/CompatiblePortal.vue'

import type { PopoverProps, PopoverPositon, PopoverRef } from './types'
import { debounce } from '../../utils/performance'
import { isServer } from '../../utils/ssr'

const props = withDefaults(defineProps<PopoverProps>(), {
  position: 'bottom',
  trigger: 'hover',
  closeOnClickOutside: true,
  closeOnEscape: true,
  duration: 250,
  offset: 6,
})

const emit = defineEmits<{
  show: []
  hide: []
  toggle: [visible: boolean]
}>()

const triggerRef = ref<HTMLElement>()
const popoverRef = ref<HTMLElement>()
const visible = ref(false)

const margin = 8

// 计算所有可能的位置
const calculatePosition = (
  position: PopoverPositon,
  triggerRect: DOMRect,
  popoverRect: DOMRect
) => {
  const positions: Record<PopoverPositon, { x: number; y: number }> = {
    // Top positions
    top: {
      x: triggerRect.left + triggerRect.width / 2 - popoverRect.width / 2,
      y: triggerRect.top - popoverRect.height - props.offset,
    },
    'top-start': {
      x: triggerRect.left,
      y: triggerRect.top - popoverRect.height - props.offset,
    },
    'top-end': {
      x: triggerRect.right - popoverRect.width,
      y: triggerRect.top - popoverRect.height - props.offset,
    },

    // Bottom positions
    bottom: {
      x: triggerRect.left + triggerRect.width / 2 - popoverRect.width / 2,
      y: triggerRect.bottom + props.offset,
    },
    'bottom-start': {
      x: triggerRect.left,
      y: triggerRect.bottom + props.offset,
    },
    'bottom-end': {
      x: triggerRect.right - popoverRect.width,
      y: triggerRect.bottom + props.offset,
    },

    // Left positions
    left: {
      x: triggerRect.left - popoverRect.width - props.offset,
      y: triggerRect.top + triggerRect.height / 2 - popoverRect.height / 2,
    },
    'left-start': {
      x: triggerRect.left - popoverRect.width - props.offset,
      y: triggerRect.top,
    },
    'left-end': {
      x: triggerRect.left - popoverRect.width - props.offset,
      y: triggerRect.bottom - popoverRect.height,
    },

    // Right positions
    right: {
      x: triggerRect.right + props.offset,
      y: triggerRect.top + triggerRect.height / 2 - popoverRect.height / 2,
    },
    'right-start': {
      x: triggerRect.right + props.offset,
      y: triggerRect.top,
    },
    'right-end': {
      x: triggerRect.right + props.offset,
      y: triggerRect.bottom - popoverRect.height,
    },
  }

  return positions[position]
}

// 检查位置是否在视口内
const isInViewport = (x: number, y: number, width: number, height: number) => {
  if (isServer()) return

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
  if (isServer())
    return {
      x: 0,
      y: 0,
    }

  // 简单回退配置
  const getSimpleFallbacks = (PopoverPositon: PopoverPositon): PopoverPositon[] => {
    const base = PopoverPositon.split('-')[0] as 'top' | 'bottom' | 'left' | 'right'
    const opposite = { top: 'bottom', bottom: 'top', left: 'right', right: 'left' }

    return [
      PopoverPositon, // 首选位置
      opposite[base] as PopoverPositon, // 对面位置
      'bottom', // 默认回退
    ]
  }

  // 位置优先级，如果首选位置不可用，按此顺序尝试
  const positions = getSimpleFallbacks(props.position)

  // 尝试找到完全在视口内的位置
  for (const PopoverPositon of positions) {
    const pos = calculatePosition(PopoverPositon, triggerRect, popoverRect)
    if (pos && isInViewport(pos.x, pos.y, popoverRect.width, popoverRect.height)) {
      return { ...pos }
    }
  }

  // 如果所有预设位置都不合适，进行智能调整
  const preferredPos = calculatePosition(props.position, triggerRect, popoverRect)

  // 限制在视口内即可
  const adjustedX = Math.max(
    margin,
    Math.min(preferredPos.x, window.innerWidth - popoverRect.width - margin)
  )

  const adjustedY = Math.max(
    margin,
    Math.min(preferredPos.y, window.innerHeight - popoverRect.height - margin)
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
  // eslint-disable-next-line  @typescript-eslint/no-unused-expressions
  forceUpdate.value

  // 统一的隐藏样式（服务端和客户端一致）
  const hiddenStyle: CSSProperties = {
    pointerEvents: 'none',
    visibility: 'hidden',
    left: '0px',
    top: '0px',
    transform: 'translateX(-100vw)',
  }

  // 服务端返回隐藏样式
  if (isServer()) {
    return hiddenStyle
  }

  // 元素未准备好时返回隐藏样式
  if (!triggerRef.value || !popoverRef.value || !visible.value) {
    return hiddenStyle
  }

  // 计算实际位置
  try {
    const triggerRect = triggerRef.value.getBoundingClientRect()
    const popoverRect = getRealRect(popoverRef.value)
    const position = getBestPosition(triggerRect, popoverRect)

    return {
      left: `${position.x + window.scrollX}px`,
      top: `${position.y + window.scrollY}px`,
      transform: 'translateX(0)', // 重置 transform
      'z-index': props.zIndex || 0,
      visibility: 'visible',
      // pointerEvents: 'auto',
    }
  } catch (error) {
    console.warn('Popover position calculation failed:', error)
    return hiddenStyle
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

let hoverTimer: ReturnType<typeof setTimeout> | null = null

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
  if (visible.value && triggerRef.value && popoverRef.value) {
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
