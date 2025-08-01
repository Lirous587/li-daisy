import type { ComputedRef } from 'vue'

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

type Trigger = 'hover' | 'click'

export interface PopoverProps {
  positon?: Positon
  trigger?: Trigger
  closeOnClickOutside?: boolean
  closeOnEscape?: boolean
  zIndex?: number
}

export interface PopoverRef {
  show: () => void
  hide: () => void
  toggle: () => void
  visible: ComputedRef<boolean>
}
