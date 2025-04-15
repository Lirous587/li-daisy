import DefaultTheme from 'vitepress/theme'

import ComponentGrid from './components/ComponentGrid.vue'

import '../../../packages/assets/css/tailwind.css'
// 导入组件库和安装函数
import * as LiDaisy from '../../../packages/index'

// 引入自定义样式
import './custom.css'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component('ComponentGrid', ComponentGrid)

    Object.entries(LiDaisy).forEach(([name, component]) => {
      app.component(name, component)
    })
  },
}
