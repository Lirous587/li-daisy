import type { App } from 'vue'
import type { InstallOptions } from '../types'
import Drawer from './src/main.vue'

import type { DrawerRef } from './src/types'

Drawer.install = (app: App, { prefix = 'Li' }: InstallOptions = {}): void => {
  app.component(`${prefix}Drawer`, Drawer)
}

export { Drawer }

export type { DrawerRef }

export default Drawer
