import type { App } from 'vue'
import type { InstallOptions } from '../types'
import NumberInput from './src/main.vue'

import type { NumberInputProps } from './src/types'

NumberInput.install = (app: App, { prefix = 'Li' }: InstallOptions = {}): void => {
  app.component(`${prefix}NumberInput`, NumberInput)
}

export { NumberInput }

export type { NumberInputProps }

export default NumberInput
