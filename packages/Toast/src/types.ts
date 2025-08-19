import type { VNode } from 'vue'
import type { QueuePosition } from '../../index'

export type ToastType = 'info' | 'success' | 'warn' | 'error'

export type ToastPosition = Exclude<QueuePosition, 'top-center'>

export interface ToastProps {
  message: string | VNode
  title: string
  type?: ToastType
  showCloseIcon?: boolean
}

export interface ToastOptions extends ToastProps {
  position?: ToastPosition
  duration?: number
  autoClose?: boolean
}
