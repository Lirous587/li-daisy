import type { VNode } from 'vue'

export interface TableProps {
  data: Array<Record<string, unknown>>
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  zebra?: boolean
  border?: boolean
  select?: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  selectable?: (item: any) => boolean
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

export type TableSlotFunction<T = unknown> = (props: T) => VNode | undefined

export interface TableColumnPropsWithSlot extends TableColumnProps {
  defaultSlot: (scope: TableColumnDefaultScope) => VNode
  headerSlot: (scope: TableColumnHeaderScope) => VNode
}

export interface TableColumnDefaultScope<T = Record<string, unknown>> {
  row: T
  index: number
}

export interface TableColumnHeaderScope {
  label?: string
  prop?: string
}

export interface TableColumnExpandScope<T = Record<string, unknown>> {
  row: T
  index: number
}
