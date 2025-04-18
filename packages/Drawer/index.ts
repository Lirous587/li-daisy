import type { App } from 'vue'
import type { InstallOptions } from '../types'
import Drawer from './src/main.vue'
import DrawerConfirm from './src/confirm.vue'

import type { DrawerProps, DrawerRef, DrawerConfirmProps, DrawerConfirmRef } from './src/types'

Drawer.install = (app: App, { prefix = 'Li' }: InstallOptions = {}): void => {
  app.component(`${prefix}Drawer`, Drawer)
}

DrawerConfirm.install = (app: App, { prefix = 'Li' }: InstallOptions = {}): void => {
  app.component(`${prefix}DrawerConfirm`, DrawerConfirm)
}

export { Drawer, DrawerConfirm }

export type { DrawerProps, DrawerRef, DrawerConfirmProps, DrawerConfirmRef }

export default Drawer
