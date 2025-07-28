import type { VNode } from 'vue'

export interface TableProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: Array<Record<string, any> & { id: number }>
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface TableColumnDefaultScope<
  T extends { id: number; [key: string]: any } = { id: number },
> {
  row: T
  index: number
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface TableColumnExpandScope<
  T extends { id: number; [key: string]: any } = { id: number },
> {
  row: T
  index: number
}
