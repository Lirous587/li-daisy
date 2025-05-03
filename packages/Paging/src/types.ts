export interface PagingProps {
  pages: number
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
