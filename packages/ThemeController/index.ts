import type { App } from 'vue'
import type { InstallOptions } from '../types'
import ThemeController from './src/main.vue'

import type { ThemeControllerRef } from './src/types'

ThemeController.install = (app: App, { prefix = 'Li' }: InstallOptions = {}): void => {
  app.component(`${prefix}ThemeController`, ThemeController)
}

export { ThemeController }

export type { ThemeControllerRef }

export default ThemeController
