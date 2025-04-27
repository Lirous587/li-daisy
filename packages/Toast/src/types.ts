export interface ToastProps {
  position?: 'top-start' | 'top-center' | 'top-end' | 'bottom-start' | 'bottom-end'
  type?: 'info' | 'success' | 'warning' | 'error'
  duration?: number
  showClose?: boolean
  message?: string
}

export interface ToastRef {
  show: () => void
  close: () => void
}

export interface ToastOptions extends Partial<ToastProps> {
  [key: string]: unknown
}

export interface MinimalToastApp {
  unmount: () => void
}

export interface ToastInstance {
  id: string
  app: MinimalToastApp
  container: HTMLElement
  close: () => void
}

// 定义Toast服务接口
export interface ToastService {
  info: (message: string, options?: ToastOptions) => ToastInstance
  success: (message: string, options?: ToastOptions) => ToastInstance
  warning: (message: string, options?: ToastOptions) => ToastInstance
  error: (message: string, options?: ToastOptions) => ToastInstance
}
