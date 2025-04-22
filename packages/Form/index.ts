import type { App } from 'vue'
import type { InstallOptions } from '../types'
import Form from './src/main.vue'
import FormItem from './src/item.vue'

import type { FormRef, FormItemProps } from './src/types'

Form.install = (app: App, { prefix = 'Li' }: InstallOptions = {}): void => {
  app.component(`${prefix}Form`, Form)
}

FormItem.install = (app: App, { prefix = 'Li' }: InstallOptions = {}): void => {
  app.component(`${prefix}FormItem`, FormItem)
}

import { useYup } from './src/yup'

export { Form, FormItem, useYup }

export type { FormRef, FormItemProps }

export default Form
