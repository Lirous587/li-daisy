import type { PopoverPositon } from '../../Popover'

export type PopconfirmPositon = PopoverPositon

export interface PopconfirmProps {
  position?: PopconfirmPositon
  closeOnClickOutside?: boolean
  closeOnEscape?: boolean
  zIndex?: number
  title?: string
  confirmText?: string
  cancleText?: string
  width?: number
  duration?: number
  offset?: number
  btnSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}
