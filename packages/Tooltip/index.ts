import type { App } from 'vue'
import type { InstallOptions } from '../types'
import Tooltip from './src/main.vue'
import type { TooltipProps } from './src/types'

Tooltip.install = (app: App, { prefix = 'Li' }: InstallOptions = {}): void => {
  app.component(`${prefix}Tooltip`, Tooltip)
}

export { Tooltip }

export type { TooltipProps }

export default Tooltip
