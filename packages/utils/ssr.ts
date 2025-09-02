/**
 * 检查是否在客户端环境
 */
export const isClient = (): boolean => {
  return typeof window !== 'undefined' && typeof document !== 'undefined'
}

/**
 * 检查是否在服务端环境
 */
export const isServer = (): boolean => {
  return typeof window === 'undefined' || typeof document === 'undefined'
}
