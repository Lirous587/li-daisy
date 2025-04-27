import type { App } from 'vue'
import type { InstallOptions } from '../types'
import Toast from './src/main.vue'
import { createToastApi } from './src/toast'

import type { ToastRef, ToastProps } from './src/types'

Toast.install = (app: App, { prefix = 'Li' }: InstallOptions = {}): void => {
  app.component(`${prefix}Toast`, Toast)
}

export { Toast }

export type { ToastRef, ToastProps }

export default Toast

// // 导出独立的 toast API，用于非组件环境
export const toast = createToastApi()
