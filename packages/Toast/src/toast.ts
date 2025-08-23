import { type Component } from 'vue'
import ToastComponent from './main.vue'
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
  options.showCloseIcon = options.showCloseIcon ?? true

  queueManager.add(
    ToastComponent,
    {
      type: type,
      title: options.title,
      message: options.message,
      showCloseIcon: options.showCloseIcon,
    },
    {
      ...options,
      position: options.position ?? 'top-end',
      autoClose: options.showCloseIcon ? options.autoClose : true,
    },
  )
}

export const Toast = {
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
