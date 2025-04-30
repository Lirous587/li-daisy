<template>
  <div
    class="overflow-x-auto bg-base-100 border-base-content/10"
    :class="[props.border ? 'rounded-box border' : 'border-y']"
  >
    <table class="table" :class="[props.zebra ? '!table-zebra' : '', tableSizeClass]">
      <thead>
        <tr>
          <th v-for="(column, index) in columns" :key="index" :style="{ width: column.width }">
            {{ column.label || column.prop }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in props.data" :key="index">
          <td v-for="column in columns" :key="column.prop">
            <!-- 检查是否有自定义插槽 -->
            <template v-if="column.slot">
              <!-- 直接调用插槽函数并传递作用域 -->
              <component :is="column.slot" :row="item" :index="index" />
            </template>
            <!-- 否则显示默认内容 -->
            <template v-else>
              {{ column.prop ? item[column.prop] : '' }}
            </template>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { computed, type VNode } from 'vue'
import type { TableProps, TableColumnPropsWithSlot } from './types'
import TableColumn from './column.vue'

const props = withDefaults(defineProps<TableProps>(), {
  size: 'md',
  zebra: true,
  pinCols: false,
  pinRows: false,
  border: true,
})

const slots = defineSlots<{
  default(): VNode[]
}>()

const columns = computed(() => {
  const defaultSlot = slots.default?.() ?? []

  const cols: TableColumnPropsWithSlot[] = []

  const extractColumns = (nodes: VNode[]) => {
    nodes.forEach((node) => {
      if (node.type === TableColumn && node.props) {
        // 检查 node.children 是否为对象且包含 default 插槽函数
        const defaultSlotFn =
          typeof node.children === 'object' && // 确保 children 是对象
          node.children !== null && // 确保不是 null
          !Array.isArray(node.children) && // 确保不是数组 (VNodeArrayChildren)
          typeof node.children.default === 'function' // 检查 default 是否是函数
            ? node.children.default
            : undefined

        cols.push({
          prop: node.props.prop,
          label: node.props.label,
          width: node.props.width,
          slot: defaultSlotFn,
        } as TableColumnPropsWithSlot)
      }
    })
  }

  extractColumns(defaultSlot)
  return cols
})

const tableSizeClass = computed(() => {
  switch (props.size) {
    case 'xs':
      return 'table-xs'
    case 'sm':
      return 'table-sm'
    case 'md':
      return 'table-md'
    case 'lg':
      return 'table-lg'
    case 'xl':
      return 'table-xl'
    default:
      return 'table-md'
  }
})
</script>
