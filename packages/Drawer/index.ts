import type { App, Plugin } from 'vue'
import Drawer from './src/main.vue'
// import CollapseItem from './src/item.vue'

// 为组件添加 install 方法，用于按需引入
Drawer.install = (app: App): void => {
  app.component('LiDrawer', Drawer)
  //   app.component('LiCollapseItem', CollapseItem)
}

// 将 CollapseItem 挂载到 Collapse 上
type DrawerType = typeof Drawer &
  Plugin & {
    // Item: typeof CollapseItem
  }

// 挂载子组件
// ;(Drawer as DrawerType).Item = CollapseItem

// 命名导出两个组件
// export { Collapse, CollapseItem }
export { Drawer }

// 默认导出组合后的组件
export default Drawer as DrawerType
