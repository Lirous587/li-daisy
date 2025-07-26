export type Positon =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'left-start'
  | 'left-end'
  | 'right'
  | 'right-start'
  | 'right-end'

export interface PopconfirmProps {
  position?: Positon
  closeOnClickOutside?: boolean
  closeOnEscape?: boolean
  zIndex?: number
  title?: string
  confirmText?: string
  cancleText?: string
  width?: number
}
