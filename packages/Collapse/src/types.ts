import type { InjectionKey, Ref } from 'vue'

export type CollapseIcon = 'plus' | 'arrow'
export type CollapseDefaultColor =
  | 'base'
  | 'neutral'
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'info'
  | 'success'
  | 'warning'
  | 'error'
export type CollapseActiveColor =
  | 'base'
  | 'neutral'
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'info'
  | 'success'
  | 'warning'
  | 'error'

export interface CollapseProps {
  border?: boolean
  itemsBorder?: boolean
  icon?: CollapseIcon
  defaultColor?: CollapseDefaultColor
  activeColor?: CollapseActiveColor
}

export interface CollapseItemProps {
  title: string
  defaultOpen?: boolean
}

export interface CollapseContext {
  registerItem: () => number
  toggleItem: (id: number) => void
  isItemActive: (id: number) => boolean
  activeItem: Ref<number>
  itemsBorder: Ref<boolean>
  icon: Ref<CollapseIcon>
  defaultColor: Ref<CollapseDefaultColor | undefined>
  activeColor: Ref<CollapseActiveColor | undefined>
}

// 创建供注入使用的Key
export const collapseInjectionKey: InjectionKey<CollapseContext> = Symbol('collapseContext')
