<template>
  <div class="join join-vertical">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { ref, provide } from 'vue'
import { collapseInjectionKey } from './types'
import type { CollapseContext } from './types'

interface CollapseProps {
  showBorder?: boolean | false
  icon?: 'plus' | 'arrow'
  default?: 'primary' | 'secondary' | 'accent' | 'neutral'
  active?: 'primary' | 'secondary' | 'accent' | 'neutral'
}

const props = defineProps<CollapseProps>()

const activeItem = ref<number>(0)

const id = ref(0)

// 提供给子组件注册自己
const items = ref<number[]>([])

// 注册一个新的折叠项
const registerItem = () => {
  items.value.push(id.value)
  id.value++
  return id.value
}

// 切换折叠项状态
const toggleItem = (id: number) => {
  if (activeItem.value === id) {
    activeItem.value = 0
  } else {
    activeItem.value = id
  }
}

// 判断折叠项是否打开
const isItemActive = (id: number) => {
  return activeItem.value === id
}

// 为子组件提供状态和方法，使用类型安全的注入键
provide<CollapseContext>(collapseInjectionKey, {
  registerItem,
  toggleItem,
  isItemActive,
  activeItem,
  showBorder: props.showBorder,
  icon: props.icon,
  default: props.default,
  active: props.active,
})
</script>

<script lang="ts">
export default {
  name: 'LiCollapse',
}
</script>
