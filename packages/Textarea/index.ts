import type { App } from 'vue'
import type { InstallOptions } from '../types'
import Textarea from './src/main.vue'

export type { TextareaSize, TextareaColor } from './src/types'

Textarea.install = (app: App, { prefix = 'Li' }: InstallOptions = {}): void => {
  app.component(`${prefix}Textarea`, Textarea)
}

export { Textarea }

export default Textarea
