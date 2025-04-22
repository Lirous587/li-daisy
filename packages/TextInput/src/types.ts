export interface TextInputProps {
  type?: 'text' | 'password' | 'email' | 'url' | 'tel' | 'search'
  placeholder?: string
  disabled?: boolean
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
