import { createApp, h, nextTick, onMounted, ref } from 'vue'
import Toast from './main.vue'
import type { ToastRef, ToastInstance, ToastOptions, ToastService, MinimalToastApp } from './types'

// 创建 toast API 函数
export function createToastApi(): ToastService {
  // 全局存储所有活动Toast的实例
  const toasts = ref<ToastInstance[]>([])

  // 创建一个新的Toast实例
  const createToast = (
    message: string,
    type: 'info' | 'success' | 'warning' | 'error' = 'success',
    options: ToastOptions = {},
  ): ToastInstance => {
    // 创建一个包含Toast组件的容器
    const container = document.createElement('div')
    document.body.appendChild(container)

    // 计算唯一ID
    const id = `toast-${Date.now()}-${Math.floor(Math.random() * 1000)}`

    // 默认选项
    const defaultOptions: ToastOptions = {
      duration: 2000,
      position: 'top-end',
      showClose: true,
    }

    // 合并默认选项和用户选项
    const mergedOptions: ToastOptions = {
      ...defaultOptions,
      ...options,
      type,
      message,
    }

    // 定义统一的关闭和清理函数
    const performClose = () => {
      // 检查 app 是否存在，防止重复卸载
      if (!app) return
      try {
        app.unmount()
      } catch (e) {
        console.error('Error unmounting toast app:', e)
      }
      app = null // 标记为 null，防止重复操作

      if (container.parentNode) {
        container.parentNode.removeChild(container)
      }
      // 从活动Toast列表中移除
      const index = toasts.value.findIndex((t) => t.id === id)
      if (index !== -1) {
        toasts.value.splice(index, 1)
      }
    }

    // 声明 app 变量，以便 performClose 可以访问
    // 使用 ReturnType<typeof createApp> 获取 createApp 的确切返回类型
    let app: ReturnType<typeof createApp> | null = null

    // 创建Vue应用实例
    app = createApp({
      setup() {
        const toastRef = ref<ToastRef | null>(null)

        // 使用生命周期钩子
        onMounted(() => {
          // 显示Toast
          nextTick(() => {
            toastRef.value?.show()
          })
        })

        // 处理组件内部触发的关闭事件
        const handleClose = (): void => {
          performClose()
        }

        return () =>
          h(Toast, {
            ref: toastRef,
            ...mergedOptions,
            onClose: handleClose,
          })
      },
    })

    // 挂载应用
    app.mount(container)

    // 存储Toast实例信息
    const toastInstance: ToastInstance = {
      id,
      app: app as MinimalToastApp,
      container,
      close: performClose,
    }

    toasts.value.push(toastInstance)

    return toastInstance
  }

  // 为不同类型提供便捷方法
  return {
    info: (message, options) => createToast(message, 'info', options),
    success: (message, options) => createToast(message, 'success', options),
    warning: (message, options) => createToast(message, 'warning', options),
    error: (message, options) => createToast(message, 'error', options),
  }
}
