import type { App, Plugin } from 'vue'
import Button from './src/main.vue'

// 定义组件类型

// 为组件添加 install 方法，用于按需引入
Button.install = (app: App): void => {
  app.component('LiButton', Button)
}

// 导出组件
export { Button }

// 默认导出组件
export default Button as typeof Button & Plugin
