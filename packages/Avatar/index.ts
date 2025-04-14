import type { App, Plugin } from 'vue'
import Avatar from './src/main.vue'

// 定义组件类型
export type { AvatarProps } from './src/types'

// 为组件添加 install 方法，用于按需引入
Avatar.install = (app: App): void => {
  app.component('LiAvatar', Avatar)
}

// 导出组件
export { Avatar }

// 默认导出组件
export default Avatar as typeof Avatar & Plugin
