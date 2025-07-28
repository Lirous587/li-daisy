import type { App } from 'vue'
import type { InstallOptions } from '../types'
import Table from './src/main.vue'
import TableColumn from './src/column.vue'

import type {
  TableProps,
  TableColumnProps,
  TableColumnDefaultScope,
  TableColumnExpandScope,
} from './src/types'

Table.install = (app: App, { prefix = 'Li' }: InstallOptions = {}): void => {
  app.component(`${prefix}Table`, Table)
}

TableColumn.install = (app: App, { prefix = 'Li' }: InstallOptions = {}): void => {
  app.component(`${prefix}TableColumn`, TableColumn)
}

export { Table, TableColumn }

export type { TableProps, TableColumnProps, TableColumnDefaultScope, TableColumnExpandScope }

export default Table
