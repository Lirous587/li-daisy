import type { VNode } from 'vue'
import type { QueuePosition } from '../../index'

export type NotificationType = 'info' | 'success' | 'warn' | 'error'

export type NotificationPosition = Exclude<QueuePosition, 'top-center'>

export interface NotificationProps {
  message: string | VNode
  title: string
  type?: NotificationType
  showCloseIcon?: boolean
}

export interface NotificationOptions extends NotificationProps {
  position?: NotificationPosition
  duration?: number
  autoClose?: boolean
}
