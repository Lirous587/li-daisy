import type { App } from 'vue'
import type { InstallOptions } from '../types'
import TextInput from './src/main.vue'

import type { TextInputProps } from './src/types'

TextInput.install = (app: App, { prefix = 'Li' }: InstallOptions = {}): void => {
  app.component(`${prefix}TextInput`, TextInput)
}

export { TextInput }

export type { TextInputProps }

export default TextInput
