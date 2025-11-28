import DefaultTheme from 'vitepress/theme'

import { type App } from 'vue'

import ComponentGrid from './components/OverviewGrid.vue'
import Demo from './components/Demo.vue'
import Layout from './Layout.vue'

// 导入样式
import './css/vitepress.css'
import './css/custom.css'
import './css/index.css'

import 'li-daisy/style.css'

import { loadingDirective } from '../../../packages/'

// 自动导入所有示例组件
const modules = import.meta.glob('../../examples/**/*.vue', { eager: true })

export default {
  ...DefaultTheme,
  Layout: Layout,
  enhanceApp({ app }: { app: App }) {
    app.component('ComponentGrid', ComponentGrid)
    app.component('Demo', Demo)
    app.directive('loading', loadingDirective)

    // 自动注册所有示例组件
    Object.entries(modules).forEach(([path, module]) => {
      // 从路径提取组件名
      // ../../examples/drawer/icon.vue -> demo-drawer-icon
      const match = path.match(/examples\/(.+)\.vue$/)
      if (match) {
        const componentName = `demo-${match[1].replace(/\//g, '-')}`
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        app.component(componentName, (module as any).default)
      }
    })
  },
}
