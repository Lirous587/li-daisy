import DefaultTheme from 'vitepress/theme'

import type { App } from 'vue'
import { createPinia } from 'pinia'

import ComponentGrid from './components/OverviewGrid.vue'

import Demo from './components/Demo.vue'

import Layout from './Layout.vue'

// 导入样式
import '../../../packages/assets/css/tailwind.css'

import '../theme/css/vitepress.css'
import '../theme/css/table.css'

export default {
  ...DefaultTheme,
  Layout: Layout,
  enhanceApp({ app }: { app: App }) {
    const pinia = createPinia()
    app.use(pinia)
    app.component('ComponentGrid', ComponentGrid)
    app.component('Demo', Demo)
  },
}
