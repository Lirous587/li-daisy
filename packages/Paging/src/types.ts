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
  // 方式一:直接传页数
  pages?: number
  // 方式二:传总数和每页条数
  total?: number
  pageSize?: number

  size?: PagingSize
  color?: PagingColor
  soft?: boolean
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
