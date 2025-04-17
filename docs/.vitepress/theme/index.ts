import DefaultTheme from 'vitepress/theme'

import ComponentGrid from './components/OverviewGrid.vue'

import Demo from './components/Demo.vue'

import Layout from './Layout.vue'

// 导入组件库
import '../../../packages/assets/css/tailwind.css'
import * as LiDaisy from '../../../packages/index'

// 引入自定义样式
import './custom.css'

export default {
  ...DefaultTheme,
  Layout: Layout,
  enhanceApp({ app }) {
    app.component('ComponentGrid', ComponentGrid)
    // eslint-disable-next-line vue/multi-word-component-names
    app.component('Demo', Demo)

    Object.entries(LiDaisy).forEach(([name, component]) => {
      app.component(name, component)
    })
  },
}
