import './assets/css/tailwind.css'
import type { App } from 'vue'

// 导入组件 导出需要的类型（明确指定而不是 export *）
import { Avatar } from './Avatar'
export type { AvatarProps } from './Avatar'

import { Collapse, CollapseItem } from './Collapse'
export type { CollapseProps, CollapseItemProps } from './Collapse'

import { Drawer, DrawerConfirm } from './Drawer'
import type { InstallOptions } from './types'
export type { DrawerProps, DrawerRef, DrawerConfirmProps, DrawerConfirmRef } from './Drawer'

// 创建组件列表
const components = [Avatar, Collapse, CollapseItem, Drawer, DrawerConfirm]

// 导出单个组件（用于按需引入）
export { Avatar, Collapse, CollapseItem, Drawer, DrawerConfirm }

// 默认导出（标准 Vue 插件格式）
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
