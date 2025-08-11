import { createApp, markRaw, reactive, type Component, type VNode } from 'vue'
import Queue from './main.vue'
import type { QueueItem, QueuePosition } from './types'

class QueueManager {
  private containers = new Map<QueuePosition, any>()
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
  private calculateStaggeredDuration(position: QueuePosition, originalDuration?: number): number {
    if (!originalDuration) return 0

    const queue = this.queues[position]
    const queueIndex = queue.length - 1 // 当前项在队列中的索引

    // 直接使用原始持续时间 + 错开延迟
    const finalDuration = originalDuration + queueIndex * this.config.staggerDelay

    return finalDuration
  }

  add(item: Omit<QueueItem, 'id'>) {
    const timestamp = Date.now()

    const id = `queue-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`

    // 使用 markRaw 标记组件，避免被响应式化
    const queueItem: QueueItem = {
      ...item,
      id,
      content: markRaw(item.content),
      ZIndex: timestamp,
    }

    // 入队
    this.queues[item.position].push(queueItem)

    // 确保容器存在
    this.ensureContainer(item.position)

    // 计算错开的持续时间
    const staggeredDuration = this.calculateStaggeredDuration(item.position, item.duration)

    // 自动删除
    if (staggeredDuration > 0) {
      setTimeout(() => {
        this.remove(id, item.position)
      }, staggeredDuration)
    }

    return id
  }

  remove(id: string, position: QueuePosition) {
    const nowQueue = this.queues[position]

    const index = nowQueue.findIndex((item) => item.id === id)
    if (index > -1) {
      const item = nowQueue[index]
      nowQueue.splice(index, 1)
      item.onClose?.()
    }
  }

  // 确保容器存在
  private ensureContainer(position: QueuePosition) {
    if (!this.containers.has(position)) {
      const container = document.createElement('div')
      document.body.appendChild(container)

      const app = createApp(Queue, {
        position,
        items: this.queues[position],
        onRemove: (id: string) => this.remove(id, position),
      })

      app.mount(container)
      this.containers.set(position, { app, container })
    }
  }

  // 清空所有队列
  clear() {
    let queuesKey = Object.keys(this.queues) as QueuePosition[]
    queuesKey.forEach((position, index) => {
      this.queues[position].length = 0
    })
  }

  // 设置错开延迟
  setStaggerDelay(delay: number) {
    if (this.isSetConfig) {
      throw new Error('已经设置过')
    }
    this.config.staggerDelay = delay
  }
}

export const queueManager = new QueueManager()

// 便捷API
export const queue = {
  add: (content: Component | VNode, options: Partial<QueueItem> = {}) => {
    return queueManager.add({
      content,
      position: 'top-end',
      ...options,
    })
  },

  remove: (id: string, position: QueuePosition) => {
    queueManager.remove(id, position)
  },

  clear: () => {
    queueManager.clear()
  },

  // 只提供错开延迟配置
  setStaggerDelay: (delay: number) => {
    queueManager.setStaggerDelay(delay)
  },
}
