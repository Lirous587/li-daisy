import type { VNode } from 'vue'

export type MessageType = 'primary' | 'info' | 'success' | 'warning' | 'error'

export interface MessageProps {
  message: string | VNode
  type?: MessageType
  plain?: boolean
  showCloseIcon?: boolean
}

export interface MessageOptions extends Omit<MessageProps, 'message'> {
  duration?: number
  autoClose?: boolean
}
