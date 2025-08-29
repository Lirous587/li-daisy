import type { Ref } from 'vue'

export type PagingSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export type PagingColor =
  | 'base'
  | 'neutral'
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'info'
  | 'success'
  | 'warning'
  | 'error'

export interface PagingProps {
  pages: number
  size?: PagingSize
  color?: PagingColor
  hideOnSinglePage?: boolean
  offset?: number
  icon?: boolean
  hideIconOnSm?: boolean
  preHref?: string
  hrefGenerator?: (page: number) => string
}

export interface PagingItem {
  value: number | string
  page: number
}

export interface PagingRef {
  change: (page: number) => void
  currentPage: number
  pages: number
}
