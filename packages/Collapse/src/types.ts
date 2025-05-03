import type { InjectionKey, Ref } from 'vue'

export interface CollapseProps {
  border?: boolean
  icon?: 'plus' | 'arrow'
  default?: 'primary' | 'secondary' | 'info' | 'accent' | 'neutral'
  active?: 'primary' | 'secondary' | 'info' | 'accent' | 'neutral'
}

export interface CollapseItemProps {
  title: string
  defaultOpen?: boolean
}

export interface CollapseContext {
  // 定义折叠面板上下文的接口
  registerItem: () => number
  toggleItem: (id: number) => void
  isItemActive: (id: number) => boolean
  activeItem: Ref<number>
  border: boolean
  icon?: 'plus' | 'arrow'
  default?: 'primary' | 'secondary' | 'info' | 'accent' | 'neutral'
  active?: 'primary' | 'secondary' | 'info' | 'accent' | 'neutral'
}

// 创建供注入使用的Key
export const collapseInjectionKey: InjectionKey<CollapseContext> = Symbol('collapseContext')
