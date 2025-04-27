export interface NumberInputProps {
  placeholder?: string
  disabled?: boolean
  max?: number
  min?: number
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  color?:
    | 'ghost'
    | 'neutral'
    | 'primary'
    | 'secondary'
    | 'accent'
    | 'info'
    | 'success'
    | 'warning'
    | 'error'
}
