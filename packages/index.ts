import './assets/css/tailwind.css'

import type { App } from 'vue'

// 导入所有组件
import Avatar from './Avatar'
import Button from './Button'
import Collapse from './Collapse'
import Drawer from './Drawer'

// 导出组件类型和组件
export * from './Avatar'
export * from './Button'
export * from './Collapse'
export * from './Drawer'

// 组件列表 - 用于全局注册
const components = [Avatar, Button, Collapse, Drawer]

const install = (app: App) => {
  components.forEach((component) => {
    if (component.install && typeof component.install === 'function') {
      app.use(component)
    } else if (component.name) {
      app.component(component.name, component)
    }
  })
  return app
}

// 只保留命名导出
export { install, Avatar, Button, Collapse, Drawer }
