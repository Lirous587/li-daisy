import type { GenericObject } from 'vee-validate'

export interface FormProps {
  schema: GenericObject
  labelWidth?: string
  align?: 'horizontal' | 'vertical'
}

export interface FormRef {
  validate: () => Promise<boolean>
  validateField: (fieldName: string) => Promise<{ valid: boolean; errors: string[] }>
}

export interface FormItemProps {
  name?: string
  label?: string
  trigger?: 'change' | 'blur' | 'input'
  align?: 'horizontal' | 'vertical'
}
