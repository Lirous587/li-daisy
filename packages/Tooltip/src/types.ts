export interface TooltipProps {
  position?: 'top' | 'bottom' | 'left' | 'right'
  color?: 'neutral' | 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error'
  open?: boolean
  content?: unknown
}
