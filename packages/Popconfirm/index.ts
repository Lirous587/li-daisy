import type { App } from 'vue'
import type { InstallOptions } from '../types'
import Popconfirm from './src/main.vue'

Popconfirm.install = (app: App, { prefix = 'Li' }: InstallOptions = {}): void => {
  app.component(`${prefix}Popconfirm`, Popconfirm)
}

export { Popconfirm }

export type { PopconfirmPositon } from './src/types'

export default Popconfirm
