export interface ModalProps {
  size?: string
  direction?: 'ltr' | 'rtl' | 'ttb' | 'btt'
  showCloseIcon?: boolean
  closeOnClickModal?: boolean
}

export interface ModalRef {
  close: () => void
  open: () => void
}
