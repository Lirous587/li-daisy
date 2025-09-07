import { type Component, type VNode } from 'vue'
import MessageComponent from './main.vue'
import { Queue, type QueueItemOptions } from '../../Queue/index'
import type { MessageOptions, MessageProps, MessageType } from './types'

class MessageManager {
  add(content: Component, props: MessageProps, options: QueueItemOptions): string {
    return Queue.addComponent(content, props, options)
  }
}

export const messageManager = new MessageManager()

const buildMessage = (message: string | VNode, type: MessageType, options?: MessageOptions) => {
  if (options) {
    options.showCloseIcon = options.showCloseIcon ?? true
    options.plain = options.plain ?? false
  }

  messageManager.add(
    MessageComponent,
    {
      type: type,
      plain: options && options.plain,
      message: message,
      showCloseIcon: options && options.showCloseIcon,
    },
    {
      ...options,
      position: 'top-center',
      // 当 showCloseIcon 设置为false时, autoClose 必定为 true，即使给定值为 false 也不会生效
      autoClose: options?.showCloseIcon === false ? true : options?.autoClose,
    }
  )
}

export const Message = {
  primary(message: string | VNode, options?: MessageOptions) {
    buildMessage(message, 'primary', options)
  },

  info(message: string | VNode, options?: MessageOptions) {
    buildMessage(message, 'info', options)
  },

  success(message: string | VNode, options?: MessageOptions) {
    buildMessage(message, 'success', options)
  },

  warning(message: string | VNode, options?: MessageOptions) {
    buildMessage(message, 'warning', options)
  },

  error(message: string | VNode, options?: MessageOptions) {
    buildMessage(message, 'error', options)
  },

  close(id: string) {
    Queue.remove(id)
  },
}
