export interface LoadingProps {
  visible: boolean
  type?: LoadingType
  color?: LoadingColor
  size?: LoadingSize
}

const TYPE_VALUES = ['spinner', 'dots', 'ring', 'ball', 'bars', 'infinity'] as const
export type LoadingType = (typeof TYPE_VALUES)[number]

const COLOR_VALUES = [
  'primary',
  'secondary',
  'accent',
  'neutral',
  'info',
  'success',
  'warning',
  'error',
] as const

export type LoadingColor = (typeof COLOR_VALUES)[number]

const SIZE_VALUES = ['xs', 'sm', 'md', 'lg', 'xl'] as const
export type LoadingSize = (typeof SIZE_VALUES)[number]

export function isLoadingType(x: string): x is LoadingType {
  return (TYPE_VALUES as readonly string[]).includes(x)
}

export function isLoadingColor(x: string): x is LoadingColor {
  return (COLOR_VALUES as readonly string[]).includes(x)
}

export function isLoadingSize(x: string): x is LoadingSize {
  return (SIZE_VALUES as readonly string[]).includes(x)
}
