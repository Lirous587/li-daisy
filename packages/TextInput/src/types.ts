export type TextInputSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export type TextInputColor =
  | 'neutral'
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'info'
  | 'success'
  | 'warning'
  | 'error'

export type TextInputType = 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search'

export interface TextInputProps {
  type?: TextInputType
  placeholder?: string
  disabled?: boolean
  maxlength?: number
  size?: TextInputSize
  color?: TextInputColor
  autocomplete?: string
}
