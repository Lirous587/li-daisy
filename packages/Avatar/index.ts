import type { App } from 'vue'
import type { InstallOptions } from '../types'
import Avatar from './src/main.vue'
export type { AvatarProps } from './src/types'

Avatar.install = (app: App, { prefix = 'Li' }: InstallOptions = {}): void => {
  app.component(`${prefix}Avatar`, Avatar)
}

export { Avatar }
export default Avatar
