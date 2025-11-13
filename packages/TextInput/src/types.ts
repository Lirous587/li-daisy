export type TextInputSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export type TextInputColor =
  | 'base'
  | 'neutral'
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'info'
  | 'success'
  | 'warning'
  | 'error'

export interface TextInputProps {
  type?: 'text' | 'password' | 'email' | 'url' | 'tel' | 'search'
  placeholder?: string
  disabled?: boolean
  maxlength?: number
  size?: TextInputSize
  color?: TextInputColor
  autocomplete?: string
}
