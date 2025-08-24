import { type Component } from 'vue'
import MessageComponent from './main.vue'
import { Queue, type QueueItemOptions } from '../../Queue/index'
import type { MessageOptions, MessageProps, MessageType } from './types'

class MessageManager {
  add(content: Component, props: MessageProps, options: QueueItemOptions): string {
    return Queue.addComponent(content, props, options)
  }
}

export const messageManager = new MessageManager()

const buildMessage = (options: MessageOptions, type: MessageType) => {
  options.showCloseIcon = options.showCloseIcon ?? true
  options.plain = options.plain ?? false

  messageManager.add(
    MessageComponent,
    {
      type: type,
      plain: options.plain,
      message: options.message,
      showCloseIcon: options.showCloseIcon,
    },
    {
      ...options,
      position: 'top-center',
      autoClose: options.showCloseIcon ? options.autoClose : true,
    },
  )
}

export const Message = {
  primary(options: MessageOptions) {
    buildMessage(options, 'primary')
  },

  info(options: MessageOptions) {
    buildMessage(options, 'info')
  },

  success(options: MessageOptions) {
    buildMessage(options, 'success')
  },

  warning(options: MessageOptions) {
    buildMessage(options, 'warning')
  },

  error(options: MessageOptions) {
    buildMessage(options, 'error')
  },

  close(id: string) {
    Queue.remove(id)
  },
}
