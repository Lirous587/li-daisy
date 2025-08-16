import { type Component } from 'vue'
import Toast from './main.vue'
import { queue, type QueueItemOptions } from '../../Queue/index'
import type { ToastOptions, ToastProps, ToastType } from './types'

class ToastManager {
  add(content: Component, props: ToastProps, options: QueueItemOptions): string {
    return queue.addComponent(content, props, options)
  }
}

export const queueManager = new ToastManager()

const buildToast = (options: ToastOptions, type: ToastType) => {
  if (!options.position) {
    options.position = 'top-end'
  }

  queueManager.add(
    Toast,
    {
      type: type,
      title: options.title,
      message: options.message,
      closeIcon: options.closeIcon,
    },
    {
      ...options,
      position: options.position ?? 'top-end',
    },
  )
}

export const toast = {
  info(options: ToastOptions) {
    buildToast(options, 'info')
  },

  success(options: ToastOptions) {
    buildToast(options, 'success')
  },

  warn(options: ToastOptions) {
    buildToast(options, 'warn')
  },

  error(options: ToastOptions) {
    buildToast(options, 'error')
  },

  close(id: string) {
    queue.remove(id)
  },
}
