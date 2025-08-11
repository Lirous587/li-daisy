import type { App } from 'vue'
import type { InstallOptions } from '../types'
import Popconfirm from './src/main.vue'

import type { Positon } from './src/types'

Popconfirm.install = (app: App, { prefix = 'Li' }: InstallOptions = {}): void => {
  app.component(`${prefix}Popconfirm`, Popconfirm)
}

export { Popconfirm }

export type { Positon as PopconfirmPositon }

export default Popconfirm
