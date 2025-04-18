import type { Reactive } from 'vue'

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

export interface DrawerConfirmProps {
  title: string
  direction?: 'ltr' | 'rtl'
  size?: string
  confirmText?: string
  cancelText?: string
  form: Reactive<Record<string, unknown>>
}

export interface DrawerConfirmRef {
  open: () => void
  close: () => void
  sumbit: () => void
}
