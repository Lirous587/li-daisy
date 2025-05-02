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
  width?: string
  align?: 'left' | 'center' | 'right'
  headerAlign?: 'left' | 'center' | 'right'
  pinCol?: 'left' | 'right'
}

export interface TableColumnPropsWithSlot extends TableColumnProps {
  defaultSlot: (scope: TableColumnDefaultScope) => VNode[]
  headerSlot: (scope: TableColumnHeaderScope) => VNode[]
}

interface TableColumnDefaultScope<T = Record<string, unknown>> {
  row: T
  index: number
}

interface TableColumnHeaderScope {
  label?: string
  prop?: string
}
