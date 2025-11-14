export type TextareaSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export type TextareaColor =
  | 'neutral'
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'info'
  | 'success'
  | 'warning'
  | 'error'

export interface TextareaProps {
  placeholder?: string
  disabled?: boolean
  minRows?: number
  maxRows?: number
  maxlength?: number
  size?: TextareaSize
  color?: TextareaColor
}
