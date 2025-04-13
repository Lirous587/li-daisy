<template>
  <div class="collapse collapse-arrow join-item">
    <input type="checkbox" :checked="isOpen" class="collapse-input" @change="toggle" />
    <div class="collapse-title border-y border-base-300 text-sm text-base-content">
      {{ props.title }}
    </div>
    <div class="collapse-content">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, inject, onMounted, ref } from 'vue'
import { collapseInjectionKey } from './interface'
import type { CollapseContext } from './interface'

interface CollapseProps {
  title: string
  defaultOpen?: boolean
}

const props = defineProps<CollapseProps>()
const id = ref<number>(0)

// 获取父组件提供的上下文，使用类型安全的注入方式
const collapseContext = inject(collapseInjectionKey) as CollapseContext

// 确保在Collapse组件内使用
if (!collapseContext) {
  throw new Error('CollapseItem必须在Collapse组件内使用')
}

// 在挂载时注册自己并设置默认打开状态
onMounted(() => {
  id.value = collapseContext.registerItem()
  if (props.defaultOpen) {
    collapseContext.toggleItem(id.value)
  }
})

// 计算当前是否打开
const isOpen = computed(() => {
  return collapseContext.isItemActive(id.value)
})

// 切换状态
function toggle() {
  collapseContext.toggleItem(id.value)
}
</script>
