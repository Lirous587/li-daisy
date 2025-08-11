import './assets/css/tailwind.css'

import type { App } from 'vue'

// 导入组件 导出需要的类型（只导出必要的类型）
import { Avatar } from './Avatar'

import { Collapse, CollapseItem } from './Collapse'

import { Drawer, DrawerConfirm } from './Drawer'
export type { DrawerRef, DrawerConfirmRef } from './Drawer'

import { Modal } from './Modal'
export type { ModalRef } from './Modal'

import { Paging } from './Paging'

import { Skeleton, SkeletonItem } from './Skeleton'

import { ThemeController } from './ThemeController'
export type { ThemeControllerRef } from './ThemeController'

import { TextInput } from './TextInput'

import { Textarea } from './Textarea'

import { Form, FormItem } from './Form'
export type { FormRef } from './Form'
export { useYup } from './Form'

import { NumberInput } from './NumberInput'

import { toast, Toast } from './Toast'
export { toast }
export type { ToastRef } from './Toast'

import { Table, TableColumn } from './Table'
export type { TableColumnDefaultScope, TableColumnExpandScope } from './Table'

import { Popover } from './Popover'
export type { PopoverRef, PopoverPositon } from './Popover'

import { Popconfirm } from './Popconfirm'
export type { PopconfirmPositon } from './Popconfirm'

export { queue } from './Queue'
export type { QueueItemRef, QueuePosition } from './Queue'

// 导出组件
export {
  Avatar,
  Collapse,
  CollapseItem,
  Drawer,
  DrawerConfirm,
  Modal,
  Paging,
  Skeleton,
  SkeletonItem,
  ThemeController,
  TextInput,
  Textarea,
  Form,
  FormItem,
  NumberInput,
  Toast,
  Table,
  TableColumn,
  Popover,
  Popconfirm,
}

// 创建组件列表
const components = [
  Avatar,
  Collapse,
  CollapseItem,
  Drawer,
  DrawerConfirm,
  Modal,
  Paging,
  Skeleton,
  SkeletonItem,
  ThemeController,
  TextInput,
  Textarea,
  Form,
  FormItem,
  NumberInput,
  Toast,
  Table,
  TableColumn,
  Popover,
  Popconfirm,
]

// 默认导出（标准 Vue 插件格式）
import type { InstallOptions } from './types'

export default {
  install: (app: App, { prefix = 'Li' }: InstallOptions = {}): App => {
    components.forEach((component) => {
      if (component.install) {
        component.install(app, { prefix })
      } else if (component.name) {
        const name = `${prefix}${component.name}`
        app.component(name, component)
      }
    })
    return app
  },
}

// 内置指令
import { loadingDirective } from './Loading'
export { loadingDirective }
