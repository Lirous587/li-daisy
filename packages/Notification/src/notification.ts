import { type Component } from 'vue'
import NotificationComponent from './main.vue'
import { Queue, type QueueItemOptions } from '../../Queue/index'
import type { NotificationOptions, NotificationProps, NotificationType } from './types'

class NotificationManager {
  add(content: Component, props: NotificationProps, options: QueueItemOptions): string {
    return Queue.addComponent(content, props, options)
  }
}

export const notificationManager = new NotificationManager()

const buildNotification = (options: NotificationOptions, type: NotificationType) => {
  if (!options.position) {
    options.position = 'top-end'
  }
  options.showCloseIcon = options.showCloseIcon ?? true

  notificationManager.add(
    NotificationComponent,
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
    }
  )
}

export const Notification = {
  primary(options: NotificationOptions) {
    buildNotification(options, 'primary')
  },

  info(options: NotificationOptions) {
    buildNotification(options, 'info')
  },

  success(options: NotificationOptions) {
    buildNotification(options, 'success')
  },

  warning(options: NotificationOptions) {
    buildNotification(options, 'warning')
  },

  error(options: NotificationOptions) {
    buildNotification(options, 'error')
  },

  close(id: string) {
    Queue.remove(id)
  },
}
