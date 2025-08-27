import type { App } from 'vue'
import type { InstallOptions } from '../types'
import NumberInput from './src/main.vue'

export type { NumberInputSize, NumberInputColor } from './src/types'

NumberInput.install = (app: App, { prefix = 'Li' }: InstallOptions = {}): void => {
  app.component(`${prefix}NumberInput`, NumberInput)
}

export { NumberInput }

export default NumberInput
