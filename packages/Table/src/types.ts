export interface TableProps {
  data: Array<unknown>
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  zebra?: boolean
  pinRows?: boolean
  pinCols?: boolean
}

export interface TableItemProps {}
