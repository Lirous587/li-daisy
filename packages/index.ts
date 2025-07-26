import './assets/css/tailwind.css'

import type { App } from 'vue'

// 导入组件 导出需要的类型（明确指定而不是 export *）
import { Avatar } from './Avatar'
export type { AvatarProps } from './Avatar'

import { Collapse, CollapseItem } from './Collapse'
export type { CollapseProps, CollapseItemProps } from './Collapse'

import { Drawer, DrawerConfirm } from './Drawer'
export type { DrawerProps, DrawerRef, DrawerConfirmProps, DrawerConfirmRef } from './Drawer'

import { Modal } from './Modal'
export type { ModalProps, ModalRef } from './Modal'

import { Paging } from './Paging'
export type { PagingProps } from './Paging'

import { Skeleton, SkeletonItem } from './Skeleton'
export type { SkeletonProps } from './Skeleton'

import { ThemeController } from './ThemeController'
export type { ThemeControllerProps, ThemeControllerRef } from './ThemeController'

import { TextInput } from './TextInput'
export type { TextInputProps } from './TextInput'

import { Textarea } from './Textarea'
export type { TextareaProps } from './Textarea'

import { Form, FormItem } from './Form'
export type { FormProps, FormRef, FormItemProps } from './Form'

export { useYup } from './Form'

import { NumberInput } from './NumberInput'
export type { NumberInputProps } from './NumberInput'

import { toast, Toast } from './Toast'
export { toast }
export type { ToastProps, ToastRef } from './Toast'

import { Table, TableColumn } from './Table'
export type { TableProps, TableColumnProps } from './Table'

import { Popover } from './Popover'
export type { PopoverProps, PopoverRef, PopoverPositon } from './Popover'

import { Popconfirm } from './Popconfirm'
export type { PopconfirmProps, PopconfirmPositon } from './Popconfirm'

// 导出单个组件（用于按需引入）
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
    // 获取用户配置的前缀，默认为'Li'
    components.forEach((component) => {
      if (component.install) {
        // 使用原始的install方法，但传递配置
        component.install(app, { prefix })
      } else if (component.name) {
        // 直接注册组件并添加前缀
        const name = `${prefix}${component.name}`
        app.component(name, component)
      }
    })
    return app
  },
}
