import DefaultTheme from 'vitepress/theme'

import { type App } from 'vue'

import ComponentGrid from './components/OverviewGrid.vue'

import Demo from './components/Demo.vue'

import Layout from './Layout.vue'

// 导入样式
import '../../../packages/assets/css/tailwind.css'
import 'li-daisy/dist/style.css'

import '../theme/css/vitepress.css'
import '../theme/css/custom.css'

import { loadingDirective } from '../../../packages/'

export default {
  ...DefaultTheme,
  Layout: Layout,
  enhanceApp({ app }: { app: App }) {
    app.component('ComponentGrid', ComponentGrid)
    app.component('Demo', Demo)
    app.directive('loading', loadingDirective)
  },
}
