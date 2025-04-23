import type { GenericObject } from 'vee-validate'

export interface FormProps {
  schema: GenericObject
  labelWidth?: string
}

export interface FormRef {
  validate: () => Promise<boolean>
  validateField: (fieldName: string) => Promise<void>
}

export interface FormItemProps {
  name: string
  label?: string
  trigger: 'change' | 'blur' | 'input'
}
