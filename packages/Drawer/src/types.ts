export type DrawerDirection = 'ltr' | 'rtl'

export interface DrawerProps {
  title?: string
  direction?: DrawerDirection
  size?: string
  closeOnClickModal?: boolean
  showCloseIcon?: boolean
}

export interface DrawerRef {
  status: boolean
  open: () => void
  close: () => void
}
