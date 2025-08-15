import { createApp, h, markRaw, reactive, type Component, type VNode } from 'vue'
import QueueLayout from './layout.vue'

import type { QueueItem, QueueItemOptions, QueuePosition } from './types'

class QueueManager {
  private app: any = null

  private container: HTMLElement | null = null
  private globalZIndex = 1000 // 全局 z-index 计数器

  private queues = reactive<Record<QueuePosition, QueueItem[]>>({
    'top-start': [],
    'top-center': [],
    'top-end': [],
    'bottom-start': [],
    'bottom-end': [],
  })

  private isSetConfig = false

  // 添加配置选项
  private config = {
    staggerDelay: 400, // 每个消息之间的延迟时间（毫秒）
  }

  // 计算错开的持续时间
  private calculateStaggeredDuration(position: QueuePosition, originalDuration: number): number {
    const queue = this.queues[position]
    const queueIndex = queue.length - 1 // 当前项在队列中的索引

    // 直接使用原始持续时间 + 错开延迟
    const finalDuration = originalDuration + queueIndex * this.config.staggerDelay

    return finalDuration
  }

  add(item: Omit<QueueItemOptions & { content: Component & VNode }, 'id'>): string {
    const id = `queue-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`

    // 每次添加都递增全局 z-index
    this.globalZIndex += 1

    const queueItem: QueueItem = {
      ...item,
      id,
      // 使用 markRaw 标记组件，避免被响应式化
      content: markRaw(item.content),
      ZIndex: this.globalZIndex,
    }

    // 入队
    this.queues[item.position].push(queueItem)

    // 确保容器存在（只需要一次）
    this.ensureContainer()

    if (!item.duration) {
      item.duration = 2000
    }

    // 给 autoClose 设置默认值
    const autoClose = item.autoClose ?? true // 默认为 true

    // 是否自动删除
    if (autoClose) {
      const staggeredDuration = this.calculateStaggeredDuration(item.position, item.duration)
      setTimeout(() => {
        this.remove(id)
      }, staggeredDuration)
    }

    return id
  }

  remove(id: string) {
    // 遍历所有位置找到对应的消息
    for (const position of Object.keys(this.queues) as QueuePosition[]) {
      const queue = this.queues[position]
      const index = queue.findIndex((item) => item.id === id)

      if (index > -1) {
        const item = queue[index]
        queue.splice(index, 1)
        item.onClose?.()
        return // 找到并删除后直接返回
      }
    }
  }

  // 确保容器存在
  private ensureContainer() {
    if (!this.app) {
      this.container = document.createElement('div')
      document.body.appendChild(this.container)

      this.app = createApp(QueueLayout, {
        queueMap: this.queues,
        onRemove: (id: string) => this.remove(id),
      })

      this.app.mount(this.container)
    }
  }

  // 设置错开延迟
  setStaggerDelay(delay: number) {
    if (this.isSetConfig) {
      throw new Error('queue组件delay配置只能设置一次')
    }
    this.config.staggerDelay = delay
    this.isSetConfig = true
  }

  destroy() {
    if (this.app) {
      this.app.unmount()
      if (this.container && this.container.parentNode) {
        this.container.parentNode.removeChild(this.container)
      }
      this.app = null
      this.container = null
    }
  }
}

export const queueManager = new QueueManager()

// 便捷API
export const queue = {
  addVnode: (content: VNode, options: QueueItemOptions) => {
    return queueManager.add({
      content,
      ...options,
    })
  },

  addComponent: <T extends Record<string, any>>(
    component: Component,
    props: T,
    options: QueueItemOptions,
  ) => {
    const vnode = h(component, props)
    return queueManager.add({
      content: vnode,
      ...options,
    })
  },

  remove: (id: string) => {
    queueManager.remove(id)
  },

  setStaggerDelay: (delay: number) => {
    queueManager.setStaggerDelay(delay)
  },

  destroy: () => {
    queueManager.destroy()
  },
}
