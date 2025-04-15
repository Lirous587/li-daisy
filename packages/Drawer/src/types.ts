export interface DrawerProps {
  title: string
  direction?: 'ltr' | 'rtl'
  size?: string
  closeOnClickModal?: boolean
  showCloseIcon?: boolean
}

export interface DrawerRef {
  open: () => void
  close: () => void
}
