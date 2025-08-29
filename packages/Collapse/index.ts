import type { App } from 'vue'
import type { InstallOptions } from '../types'
import Collapse from './src/main.vue'
import CollapseItem from './src/item.vue'

export type { CollapseIcon, CollapseDefaultColor, CollapseActiveColor } from './src/types'

Collapse.install = (app: App, { prefix = 'Li' }: InstallOptions = {}): void => {
  app.component(`${prefix}Collapse`, Collapse)
}

CollapseItem.install = (app: App, { prefix = 'Li' }: InstallOptions = {}): void => {
  app.component(`${prefix}CollapseItem`, CollapseItem)
}

export { Collapse, CollapseItem }

export default Collapse
