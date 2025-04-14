import type { App, Plugin } from 'vue'
import Collapse from './src/main.vue'
import CollapseItem from './src/item.vue'

// 为组件添加 install 方法，用于按需引入
Collapse.install = (app: App): void => {
  app.component('LiCollapse', Collapse)
  app.component('LiCollapseItem', CollapseItem)
}

// 将 CollapseItem 挂载到 Collapse 上
type CollapseType = typeof Collapse &
  Plugin & {
    Item: typeof CollapseItem
  }

// 挂载子组件
;(Collapse as CollapseType).Item = CollapseItem

// 命名导出两个组件
export { Collapse, CollapseItem }

// 默认导出组合后的组件
export default Collapse as CollapseType
