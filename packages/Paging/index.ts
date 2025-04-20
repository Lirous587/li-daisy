import type { App } from 'vue'
import type { InstallOptions } from '../types'
import Paging from './src/main.vue'

import type { PagingProps } from './src/types'

Paging.install = (app: App, { prefix = 'Li' }: InstallOptions = {}): void => {
  app.component(`${prefix}Paging`, Paging)
}

export { Paging }

export type { PagingProps }

export default Paging
