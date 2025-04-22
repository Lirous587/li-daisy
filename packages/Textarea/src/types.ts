export interface TextareaProps {
  placeholder?: string
  disabled?: boolean
  minRows?: number
  maxRows?: number
  maxlength?: number
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
