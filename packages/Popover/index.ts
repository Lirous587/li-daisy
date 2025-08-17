import type { App } from 'vue'
import type { InstallOptions } from '../types'
import Popover from './src/main.vue'

import type { PopoverRef, PopoverPositon } from './src/types'

Popover.install = (app: App, { prefix = 'Li' }: InstallOptions = {}): void => {
  app.component(`${prefix}Popover`, Popover)
}

export { Popover }

export type { PopoverRef, PopoverPositon }

export default Popover
