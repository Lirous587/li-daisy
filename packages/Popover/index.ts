import type { App } from 'vue'
import type { InstallOptions } from '../types'
import Popover from './src/main.vue'

import type { PopoverProps } from './src/types'

Popover.install = (app: App, { prefix = 'Li' }: InstallOptions = {}): void => {
  app.component(`${prefix}Popover`, Popover)
}

export { Popover }

export type { PopoverProps }

export default Popover
