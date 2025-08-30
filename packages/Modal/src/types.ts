export type ModalDirection = 'ltr' | 'rtl' | 'middle' | 'ttb' | 'btt'

export interface ModalProps {
  size?: string
  direction?: ModalDirection
  showCloseIcon?: boolean
  closeOnClickModal?: boolean
}

export interface ModalRef {
  close: () => void
  open: () => void
}
