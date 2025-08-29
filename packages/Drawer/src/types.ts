import type { Ref } from 'vue'

export type DrawerDirection = 'ltr' | 'rtl'

export interface DrawerProps {
  title?: string
  direction?: DrawerDirection
  size?: string
  closeOnClickModal?: boolean
  showCloseIcon?: boolean
}

export interface DrawerRef {
  status: Ref<boolean>
  open: () => void
  close: () => void
}
