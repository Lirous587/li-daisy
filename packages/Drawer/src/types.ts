export type DrawerDirection = 'ltr' | 'rtl'

export interface DrawerProps {
  title?: string
  direction?: DrawerDirection
  size?: string
  closeOnClickModal?: boolean
  showCloseIcon?: boolean
  destroyOnClose?: boolean
}

export interface DrawerRef {
  open: () => void
  close: () => void
}
