export interface InputProps {
  type?: 'text' | 'password' | 'email' | 'url' | 'tel' | 'search'
  // | 'date'
  // | 'datetime-local'
  // | 'week'
  // | 'month'
  // | 'time'

  placeholder?: string
  disabled?: boolean
  maxlength?: number
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}
