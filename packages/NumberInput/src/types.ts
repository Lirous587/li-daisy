export type NumberInputSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export type NumberInputColor =
  | 'neutral'
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'info'
  | 'success'
  | 'warning'
  | 'error'

export interface NumberInputProps {
  placeholder?: string
  disabled?: boolean
  max?: number
  min?: number
  size?: NumberInputSize
  color?: NumberInputColor
}
