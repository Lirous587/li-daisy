import type { App } from 'vue'
import type { InstallOptions } from '../types'
import ThemeController from './src/main.vue'

import type { ThemeControllerProps, ThemeControllerRef } from './src/types'

ThemeController.install = (app: App, { prefix = 'Li' }: InstallOptions = {}): void => {
  app.component(`${prefix}ThemeController`, ThemeController)
}

export { ThemeController }

export type { ThemeControllerProps, ThemeControllerRef }

export default ThemeController
