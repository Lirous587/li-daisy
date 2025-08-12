import type { Component, VNode } from 'vue'

export type QueuePosition = 'top-start' | 'top-center' | 'top-end' | 'bottom-start' | 'bottom-end'

export interface QueueLayoutProps {
  queueMap: Record<QueuePosition, QueueItem[]>
}

export interface QueueItem {
  id: string
  content: Component | VNode // 可以是组件、字符串或VNode
  position: QueuePosition
  duration?: number
  onClose?: () => void
  ZIndex?: number
}

export interface QueueItemRef {
  close: () => void
}
