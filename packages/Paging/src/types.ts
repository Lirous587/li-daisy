export interface PagingProps {
  pages: number
  hideOnSinglePage?: boolean
  offset?: number
  showIcon?: boolean
  preHref?: string
  hrefGenerator?: (page: number) => string
}

export interface PagingItem {
  value: number | string
  page: number
}
