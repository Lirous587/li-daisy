import './assets/css/tailwind.css'

import type { App } from 'vue'

// 布局 (Layout)
import { Collapse, CollapseItem } from './Collapse'

import { Drawer } from './Drawer'
export type { DrawerRef } from './Drawer'

export { Queue } from './Queue'
export type { QueueItemRef, QueuePosition, QueueItemOptions } from './Queue'

// 数据输入 (Data Entry)
import { TextInput } from './TextInput'
export type { TextInputSize, TextInputColor } from './TextInput'

import { Textarea } from './Textarea'
export type { TextareaSize, TextareaColor } from './Textarea'

import { NumberInput } from './NumberInput'
export type { NumberInputSize, NumberInputColor } from './NumberInput'

import { Form, FormItem } from './Form'
export type { FormRef } from './Form'
export { useYup } from './Form'

// 数据展示 (Data Display)
import { Avatar } from './Avatar'

import { Table, TableColumn } from './Table'
export type { TableColumnDefaultScope, TableColumnExpandScope } from './Table'

import { Paging } from './Paging'
export type { PagingColor, PagingSize } from './Paging'

// 反馈 (Feedback)
import { Modal } from './Modal'
export type { ModalRef } from './Modal'

export { Notification } from './Notification'
export type { NotificationPosition, NotificationType } from './Notification'

export { Message } from './Message'
export type { MessageType } from './Message'

import { Skeleton, SkeletonItem } from './Skeleton'

import { Popover } from './Popover'
export type { PopoverRef, PopoverPositon } from './Popover'

import { Popconfirm } from './Popconfirm'
export type { PopconfirmPositon } from './Popconfirm'

// 主题 (Theme)
import { ThemeSwitch } from './ThemeSwitch'

// 工具类 (Tools)
import { loadingDirective } from './Loading'
export { loadingDirective }

// 导出组件
export {
  Avatar,
  Collapse,
  CollapseItem,
  Drawer,
  Modal,
  Paging,
  Skeleton,
  SkeletonItem,
  ThemeSwitch,
  TextInput,
  Textarea,
  Form,
  FormItem,
  NumberInput,
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
  Modal,
  Paging,
  Skeleton,
  SkeletonItem,
  ThemeSwitch,
  TextInput,
  Textarea,
  Form,
  FormItem,
  NumberInput,
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
