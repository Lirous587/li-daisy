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

export interface FormExpose {
  isValidate: () => boolean
  validateField: (fieldName: string) => Promise<void>
  // submit?: Function;
  // errors?: Record<string, string>;
}
