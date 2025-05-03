<template>
  <div class="collapse join-item" :class="iconClass">
    <input type="checkbox" :checked="isOpen" class="peer" @change="toggle" />
    <div class="collapse-title font-semibold" :class="collapseStyle">
      {{ props.title }}
    </div>
    <div class="collapse-content !border-none" :class="collapseStyle">
      <div class="p-[1rem]">
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, inject, ref } from 'vue'
import { collapseInjectionKey } from './types'
import type { CollapseContext, CollapseItemProps } from './types'

const props = withDefaults(defineProps<CollapseItemProps>(), {
  defaultOpen: false,
})

const id = ref<number>(0)

// 获取父组件提供的上下文，使用类型安全的注入方式
const collapseContext = inject(collapseInjectionKey) as CollapseContext

// 确保在Collapse组件内使用
if (!collapseContext) {
  throw new Error('CollapseItem必须在Collapse组件内使用')
}

const border = computed(() => collapseContext.border)

const borderClass = computed(() => {
  return border.value ? 'border-y border-base-300' : ''
})

const icon = computed(() => collapseContext.icon)

const iconClass = computed(() => {
  switch (icon.value) {
    case 'arrow':
      return 'collapse-arrow'
    default:
      return 'collapse-plus'
  }
})

const defaultComputed = computed(() => collapseContext.default)
const defaultClass = computed(() => {
  switch (defaultComputed.value) {
    case 'primary': {
      return 'bg-primary text-primary-content'
    }
    case 'secondary': {
      return 'bg-secondary text-secondary-content '
    }
    case 'info': {
      return 'bg-info text-info-content '
    }
    case 'neutral': {
      return 'bg-neutral text-neutral-content '
    }
    case 'accent': {
      return 'bg-accent text-accent-content '
    }
    default: {
      return 'bg-base-100 text-base-content'
    }
  }
})

const activeComputed = computed(() => collapseContext.active)

const activeClass = computed(() => {
  switch (activeComputed.value) {
    case 'primary': {
      return 'peer-checked:bg-primary peer-checked:text-primary-content'
    }
    case 'secondary': {
      return 'peer-checked:bg-secondary peer-checked:text-secondary-content '
    }
    case 'info': {
      return 'peer-checked:bg-info peer-checked:text-info-content '
    }
    case 'neutral': {
      return 'peer-checked:bg-neutral peer-checked:text-neutral-content '
    }
    case 'accent': {
      return 'peer-checked:bg-accent peer-checked:text-accent-content '
    }
    default: {
      return 'peer-checked:bg-base-100 peer-checked:text-base-content'
    }
  }
})

const collapseStyle = computed(() => {
  if (borderClass.value !== '') {
    return borderClass.value
  } else {
    return [defaultClass.value, activeClass.value]
  }
})

// 注册自己并设置默认打开状态
id.value = collapseContext.registerItem()
if (props.defaultOpen) {
  collapseContext.toggleItem(id.value)
}

// 计算当前是否打开
const isOpen = computed(() => {
  return collapseContext.isItemActive(id.value)
})

// 切换状态
function toggle() {
  collapseContext.toggleItem(id.value)
}
</script>
