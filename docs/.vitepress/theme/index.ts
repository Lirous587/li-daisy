import DefaultTheme from 'vitepress/theme'

import ComponentGrid from './components/OverviewGrid.vue'

import Demo from './components/Demo.vue'

import Layout from './Layout.vue'

// 导入样式
import '../../../packages/assets/css/tailwind.css'

export default {
  ...DefaultTheme,
  Layout: Layout,
  enhanceApp({ app }) {
    app.component('ComponentGrid', ComponentGrid)
    app.component('Demo', Demo)
  },
}
