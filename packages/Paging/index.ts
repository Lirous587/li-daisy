import type { App } from 'vue'
import type { InstallOptions } from '../types'
import Paging from './src/main.vue'

Paging.install = (app: App, { prefix = 'Li' }: InstallOptions = {}): void => {
  app.component(`${prefix}Paging`, Paging)
}

export { Paging }

export type { PagingColor, PagingSize, PagingRef } from './src/types'

export default Paging
