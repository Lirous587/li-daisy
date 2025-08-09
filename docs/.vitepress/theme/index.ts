import DefaultTheme from 'vitepress/theme'

import type { App } from 'vue'
import { createPinia } from 'pinia'

import ComponentGrid from './components/OverviewGrid.vue'

import Demo from './components/Demo.vue'

import Layout from './Layout.vue'

// 导入样式
import '../../../packages/assets/css/tailwind.css'
import 'li-daisy/dist/style.css'

import '../theme/css/vitepress.css'
import '../theme/css/table.css'
import '../theme/css/a.css'

import { loadingDirective } from '../../../packages/'

export default {
  ...DefaultTheme,
  Layout: Layout,
  enhanceApp({ app }: { app: App }) {
    const pinia = createPinia()
    app.use(pinia)
    app.component('ComponentGrid', ComponentGrid)
    app.component('Demo', Demo)
    app.directive('loading', loadingDirective)
  },
}
