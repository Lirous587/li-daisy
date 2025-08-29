<template>
  <div
    class="collapse !rounded-none relative"
    :class="[iconClass, hasBorder ? 'border-t' : '', defaultBorder, activeBorder]"
  >
    <input type="checkbox" :checked="isOpen" class="peer" @change="toggle" />
    <div class="collapse-title font-semibold" :class="[defaultText, activeText]">
      {{ props.title }}
    </div>
    <div class="collapse-content" :class="[defaultText, activeText]">
      <slot />
    </div>

    <!-- 遮罩 -->
    <div
      class="absolute inset-0 z-[-1] transition-colors duration-200"
      :class="[defaultBg, activeBg]"
    ></div>
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

const hasBorder = computed(() => {
  if (collapseContext.activeColor.value || collapseContext.defaultColor.value) {
    return false
  } else {
    return collapseContext.itemsBorder.value
  }
})

const icon = computed(() => collapseContext.icon?.value)

const iconClass = computed(() => {
  switch (icon.value) {
    case 'arrow':
      return 'collapse-arrow'
    default:
      return 'collapse-plus'
  }
})

const defaultComputed = computed(() => collapseContext.defaultColor?.value)
const defaultBg = computed(() => {
  switch (defaultComputed.value) {
    case 'base': {
      return 'bg-base-200'
    }
    case 'primary': {
      return 'bg-primary/35'
    }
    case 'secondary': {
      return 'bg-secondary/35'
    }
    case 'neutral': {
      return 'bg-neutral/35'
    }
    case 'accent': {
      return 'bg-accent/35'
    }
    case 'info': {
      return 'bg-info/35'
    }
    case 'success': {
      return 'bg-success/35'
    }
    case 'warning': {
      return 'bg-warning/35'
    }
    case 'error': {
      return 'bg-error/35'
    }
    default: {
      return 'bg-base-200'
    }
  }
})

const defaultText = computed(() => {
  switch (defaultComputed.value) {
    case 'base': {
      return 'text-base-content'
    }
    case 'primary': {
      return 'text-primary'
    }
    case 'secondary': {
      return 'text-secondary'
    }
    case 'neutral': {
      return 'text-neutral'
    }
    case 'accent': {
      return 'text-accent'
    }
    case 'info': {
      return 'text-info'
    }
    case 'success': {
      return 'text-success'
    }
    case 'warning': {
      return 'text-warning'
    }
    case 'error': {
      return 'text-error'
    }
    default: {
      return 'text-base-content'
    }
  }
})

const defaultBorder = computed(() => {
  switch (defaultComputed.value) {
    case 'base': {
      return 'border-base-300'
    }
    case 'primary': {
      return 'border-primary'
    }
    case 'secondary': {
      return 'border-secondary'
    }
    case 'neutral': {
      return 'border-neutral'
    }
    case 'accent': {
      return 'border-accent'
    }
    case 'info': {
      return 'border-info'
    }
    case 'success': {
      return 'border-success'
    }
    case 'warning': {
      return 'border-warning'
    }
    case 'error': {
      return 'border-error'
    }
    default: {
      return 'border-base-300'
    }
  }
})

const activeComputed = computed(() => collapseContext.activeColor?.value)

const activeBg = computed(() => {
  switch (activeComputed.value) {
    case 'base': {
      return 'peer-checked:bg-base-200'
    }
    case 'primary': {
      return 'peer-checked:bg-primary/35'
    }
    case 'secondary': {
      return 'peer-checked:bg-secondary/35'
    }
    case 'neutral': {
      return 'peer-checked:bg-neutral/35'
    }
    case 'accent': {
      return 'peer-checked:bg-accent/35'
    }
    case 'info': {
      return 'peer-checked:bg-info/35'
    }
    case 'success': {
      return 'peer-checked:bg-success/35'
    }
    case 'warning': {
      return 'peer-checked:bg-warning/35'
    }
    case 'error': {
      return 'peer-checked:bg-error/35'
    }
    default: {
      return 'peer-checked:bg-base-200'
    }
  }
})

const activeText = computed(() => {
  switch (activeComputed.value) {
    case 'base': {
      return 'peer-checked:text-base-content'
    }
    case 'primary': {
      return 'peer-checked:text-primary'
    }
    case 'secondary': {
      return 'peer-checked:text-secondary'
    }
    case 'neutral': {
      return 'peer-checked:text-neutral'
    }
    case 'accent': {
      return 'peer-checked:text-accent'
    }
    case 'info': {
      return 'peer-checked:text-info'
    }
    case 'success': {
      return 'peer-checked:text-success'
    }
    case 'warning': {
      return 'peer-checked:text-warning'
    }
    case 'error': {
      return 'peer-checked:text-error'
    }
    default: {
      return 'peer-checked:text-base-content'
    }
  }
})

const activeBorder = computed(() => {
  switch (activeComputed.value) {
    case 'base': {
      return 'peer-checked:border-base-300'
    }
    case 'primary': {
      return 'peer-checked:border-primary'
    }
    case 'secondary': {
      return 'peer-checked:border-secondary'
    }
    case 'neutral': {
      return 'peer-checked:border-neutral'
    }
    case 'accent': {
      return 'peer-checked:border-accent'
    }
    case 'info': {
      return 'peer-checked:border-info'
    }
    case 'success': {
      return 'peer-checked:border-success'
    }
    case 'warning': {
      return 'peer-checked:border-warning'
    }
    case 'error': {
      return 'peer-checked:border-error'
    }
    default: {
      return 'peer-checked:border-base-content'
    }
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
