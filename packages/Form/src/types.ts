import type { GenericObject } from 'vee-validate'

export interface FormProps {
  schema: GenericObject
  labelWidth?: string
  align?: 'horizontal' | 'vertical'
}

export interface FormRef {
  validate: () => Promise<void>
  validateField: (fieldName: string) => Promise<void>
}

export interface FormItemProps {
  name?: string
  label?: string
  trigger?: 'change' | 'blur' | 'input'
  align?: 'horizontal' | 'vertical'
}
