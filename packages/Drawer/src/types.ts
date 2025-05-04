import type { Reactive } from 'vue'

export interface DrawerProps {
  title: string
  direction?: 'ltr' | 'rtl'
  size?: string
  closeOnClickModal?: boolean
  closeIcon?: boolean
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: Reactive<Record<string, any>>
}

export interface DrawerConfirmRef {
  open: () => void
  close: () => void
  sumbit: () => void
}
