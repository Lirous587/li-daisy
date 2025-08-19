import type { App } from 'vue'
import type { InstallOptions } from '../types'
import ThemeSwitch from './src/main.vue'

ThemeSwitch.install = (app: App, { prefix = 'Li' }: InstallOptions = {}): void => {
  app.component(`${prefix}ThemeSwitch`, ThemeSwitch)
}

export { ThemeSwitch }

export default ThemeSwitch
