import type { Ref } from 'vue'

export interface DrawerProps {
  title?: string
  direction?: 'ltr' | 'rtl'
  size?: string
  closeOnClickModal?: boolean
  closeIcon?: boolean
}

export interface DrawerRef {
  open: () => void
  close: () => void
  status: Ref<boolean>
}
