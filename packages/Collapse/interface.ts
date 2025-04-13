import { InjectionKey, Ref } from 'vue'

// 定义折叠面板上下文的接口
export interface CollapseContext {
  registerItem: () => number
  toggleItem: (id: number) => void
  isItemActive: (id: number) => boolean
  activeItem: Ref<number>
}

// 创建供注入使用的Key
export const collapseInjectionKey: InjectionKey<CollapseContext> = Symbol('collapseContext')
