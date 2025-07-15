<template>
  <div ref="triggerRef" class="inline-block">
    <!-- 触发器插槽 -->
    <slot name="trigger" />

    <!-- 悬浮内容 -->
    <Teleport to="body">
      <div
        ref="popoverRef"
        class="absolute transition-all duration-200 opacity-0"
        :class="[visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95']"
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
import { ref, computed, onMounted, onUnmounted, type CSSProperties } from 'vue'
import type { PopoverProps, Placement, PopoverRef } from './types'

const props = withDefaults(defineProps<PopoverProps>(), {
  placement: 'bottom',
  trigger: 'click',
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

const offset = 8
const margin = 8

// 计算所有可能的位置
const calculatePosition = (placement: Placement, triggerRect: DOMRect, popoverRect: DOMRect) => {
  const positions: Record<Placement, { x: number; y: number }> = {
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

  return positions[placement]
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
  const getSimpleFallbacks = (placement: Placement): Placement[] => {
    const base = placement.split('-')[0] as 'top' | 'bottom' | 'left' | 'right'
    const opposite = { top: 'bottom', bottom: 'top', left: 'right', right: 'left' }

    return [
      placement, // 首选位置
      opposite[base] as Placement, // 对面位置
      'bottom', // 默认回退
    ]
  }

  // 位置优先级，如果首选位置不可用，按此顺序尝试
  const placements = getSimpleFallbacks(props.placement)

  // 尝试找到完全在视口内的位置
  for (const placement of placements) {
    const pos = calculatePosition(placement, triggerRect, popoverRect)
    if (pos && isInViewport(pos.x, pos.y, popoverRect.width, popoverRect.height)) {
      return { ...pos }
    }
  }

  // 如果所有预设位置都不合适，进行智能调整
  const preferredPos = calculatePosition(props.placement, triggerRect, popoverRect)

  // 调整到视口内
  let adjustedX = preferredPos.x
  let adjustedY = preferredPos.y

  // 智能水平调整 - 优先保持在触发器附近
  if (adjustedX < margin) {
    adjustedX = Math.max(margin, triggerRect.left - popoverRect.width / 2)
  } else if (adjustedX + popoverRect.width > window.innerWidth - margin) {
    adjustedX = Math.min(
      window.innerWidth - popoverRect.width - margin,
      triggerRect.right - popoverRect.width / 2,
    )
  }

  // 智能垂直调整 - 优先保持在触发器附近
  if (adjustedY < margin) {
    adjustedY = Math.max(margin, triggerRect.bottom + offset)
  } else if (adjustedY + popoverRect.height > window.innerHeight - margin) {
    adjustedY = Math.min(
      window.innerHeight - popoverRect.height - margin,
      triggerRect.top - popoverRect.height - offset,
    )
  }

  return {
    x: adjustedX,
    y: adjustedY,
  }
}

// 计算悬浮框样式
const popoverStyle = computed((): CSSProperties => {
  if (!triggerRef.value || !popoverRef.value) {
    return {
      pointerEvents: 'none',
    }
  }

  forceUpdate.value // 这行代码让 computed 依赖这个变量

  const triggerRect = triggerRef.value.getBoundingClientRect()
  const popoverRect = popoverRef.value.getBoundingClientRect()

  // 获取最佳位置
  const position = getBestPosition(triggerRect, popoverRect)

  return {
    left: `${position.x + window.scrollX}px`,
    top: `${position.y + window.scrollY}px`,
    'z-index': props.zIndex || 0,
    pointerEvents: 'auto',
  }
})

// 显示悬浮框
const show = () => {
  visible.value = true
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

// 事件监听
onMounted(() => {
  if (triggerRef.value) {
    triggerRef.value.addEventListener('click', handleTriggerClick)
    triggerRef.value.addEventListener('mouseenter', handleTriggerMouseEnter)
    triggerRef.value.addEventListener('mouseleave', handleTriggerMouseLeave)
  }

  document.addEventListener('click', handleClickOutside)
  document.addEventListener('keydown', handleEscapeKey)
  window.addEventListener('resize', updatePosition)
  // window.addEventListener('scroll', updatePosition)
})

onUnmounted(() => {
  if (triggerRef.value) {
    triggerRef.value.removeEventListener('click', handleTriggerClick)
    triggerRef.value.removeEventListener('mouseenter', handleTriggerMouseEnter)
    triggerRef.value.removeEventListener('mouseleave', handleTriggerMouseLeave)
  }

  document.removeEventListener('click', handleClickOutside)
  document.removeEventListener('keydown', handleEscapeKey)
  window.removeEventListener('resize', updatePosition)
  // window.removeEventListener('scroll', updatePosition)

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
