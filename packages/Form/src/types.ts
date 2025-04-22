export interface FormRef {
  isValidate: () => boolean
  validateField: (fieldName: string) => Promise<void>
  // submit?: Function;
  // errors?: Record<string, string>;
}

export interface FormItemProps {
  name: string
  label?: string
}
