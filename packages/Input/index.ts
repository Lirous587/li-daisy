import type { App } from 'vue'
import type { InstallOptions } from '../types'
import Input from './src/main.vue'

import type { InputProps } from './src/types'

Input.install = (app: App, { prefix = 'Li' }: InstallOptions = {}): void => {
  app.component(`${prefix}Input`, Input)
}

export { Input }

export type { InputProps }

export default Input
