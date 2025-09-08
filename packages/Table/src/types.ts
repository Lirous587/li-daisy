import type { VNode } from 'vue'

export type TableSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface TableProps<T = Record<string, any>> {
  data: T[]
  size?: TableSize
  zebra?: boolean
  border?: boolean
  select?: boolean
  hoverHighlight?: boolean
  placeholderHeight?: number
  selectable?: (item: T) => boolean
}

export interface TableColumnProps {
  prop?: string
  label?: string
  width?: number
  align?: 'left' | 'center' | 'right'
  headerAlign?: 'left' | 'center' | 'right'
  pinCol?: 'left' | 'right'
  type?: 'expand'
  tooltip?: boolean
  rowKey?: string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TableSlotFunction<T = any> = (props: T) => VNode | undefined

export interface TableColumnPropsWithSlot extends TableColumnProps {
  defaultSlot: (scope: TableColumnDefaultScope) => VNode
  headerSlot: (scope: TableColumnHeaderScope) => VNode
}

export interface TableColumnHeaderScope {
  label?: string
  prop?: string
}

export interface TableColumnDefaultScope<T = object> {
  row: T
  index: number
}

export interface TableColumnExpandScope<T = object> {
  row: T
  index: number
}
