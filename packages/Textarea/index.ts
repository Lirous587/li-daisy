import type { App } from 'vue'
import type { InstallOptions } from '../types'
import Textarea from './src/main.vue'

import type { TextareaProps } from './src/types'

Textarea.install = (app: App, { prefix = 'Li' }: InstallOptions = {}): void => {
  app.component(`${prefix}Textarea`, Textarea)
}

export { Textarea }

export type { TextareaProps }

export default Textarea
