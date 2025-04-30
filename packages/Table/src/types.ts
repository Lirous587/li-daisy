import type { VNode } from 'vue'

export interface TableProps {
  data: Array<Record<string, unknown>>
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  zebra?: boolean
  border?: boolean
  pinRows?: boolean
  pinCols?: boolean
}

export interface TableColumnProps {
  prop?: string
  label?: string
  width?: string
}

export interface TableColumnPropsWithSlot {
  prop?: string
  label?: string
  width?: string
  slot?: (scope: TableColumnScope) => VNode[]
}

export interface TableColumnScope<T = Record<string, unknown>> {
  row: T
  index: number
}
