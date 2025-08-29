<template>
  <div
    class="flex flex-col rounded-md overflow-hidden my-1 [&>:first-child]:border-t-0"
    :class="border ? 'border border-base-300' : ''"
  >
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { ref, provide, toRefs } from 'vue'
import { collapseInjectionKey } from './types'
import type { CollapseContext, CollapseProps } from './types'

const props = withDefaults(defineProps<CollapseProps>(), {
  icon: 'plus',
  border: true,
  itemBorder: true,
})

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

const context = {
  registerItem,
  toggleItem,
  isItemActive,
  activeItem,
  // 用 toRefs 保证 props.xxx 变化时 context.xxx 也会变
  ...toRefs(props),
}

// 为子组件提供状态和方法，使用类型安全的注入键
provide<CollapseContext>(collapseInjectionKey, context)
</script>
