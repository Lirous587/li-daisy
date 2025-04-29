import type { App } from 'vue'
import type { InstallOptions } from '../types'
import Table from './src/main.vue'
import TableItem from './src/item.vue'

import type { TableProps, TableItemProps } from './src/types'

Table.install = (app: App, { prefix = 'Li' }: InstallOptions = {}): void => {
  app.component(`${prefix}Table`, Table)
}

TableItem.install = (app: App, { prefix = 'Li' }: InstallOptions = {}): void => {
  app.component(`${prefix}TableItem`, TableItem)
}

export { Table, TableItem }

export type { TableProps, TableItemProps }

export default Table
