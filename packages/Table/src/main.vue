<template>
  <div
    class="overflow-auto bg-base-100 border-base-content/10"
    :class="[props.border ? 'rounded-box border' : 'border-y']"
  >
    <table
      class="table table-pin-rows table-pin-cols"
      :class="[props.zebra ? '!table-zebra' : '', tableSizeClass]"
    >
      <thead>
        <tr>
          <th v-if="props.select" class="!pl-4 !p-1 w-0">
            <input
              type="checkbox"
              class="checkbox checkbox-sm"
              v-model="isSelectAll"
              @change="handleSelectAllChange"
            />
          </th>
          <th v-for="(column, index) in columns" :key="index" :style="{ width: column.width }">
            <template v-if="column.headerSlot">
              <div :class="getTextAlgin(column.headerAlign)">
                <component :is="column.headerSlot" :label="column.label" :prop="column.prop" />
              </div>
            </template>
            <template v-else>
              <div :class="getTextAlgin(column.headerAlign)">
                {{ column.label || column.prop }}
              </div>
            </template>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in props.data" :key="index">
          <th v-if="props.select" class="!pl-4 !p-1 w-0">
            <input
              type="checkbox"
              class="checkbox checkbox-sm"
              :checked="selectedRowsSet.has(item)"
              @change="handleSelect($event, item)"
              :disabled="!props.selectable?.(item)"
            />
          </th>

          <!-- left-pin-row -->
          <th v-for="column in leftPinCols" :key="column.prop">
            <template v-if="column.defaultSlot">
              <div :class="getTextAlgin(column.align)">
                <component :is="column.defaultSlot" :row="item" :index="index" />
              </div>
            </template>
            <template v-else>
              <div :class="getTextAlgin(column.align)">
                {{ column.prop ? item[column.prop] : '' }}
              </div>
            </template>
          </th>
          <!-- no-pin-row -->
          <td v-for="column in regularCols" :key="column.prop">
            <template v-if="column.defaultSlot">
              <div :class="getTextAlgin(column.align)">
                <component :is="column.defaultSlot" :row="item" :index="index" />
              </div>
            </template>
            <template v-else>
              <div :class="getTextAlgin(column.align)">
                {{ column.prop ? item[column.prop] : '' }}
              </div>
            </template>
          </td>
          <!-- left-pin-row -->
          <th v-for="column in rightPinCols" :key="column.prop">
            <template v-if="column.defaultSlot">
              <div :class="getTextAlgin(column.align)">
                <component :is="column.defaultSlot" :row="item" :index="index" />
              </div>
            </template>
            <template v-else>
              <div :class="getTextAlgin(column.align)">
                {{ column.prop ? item[column.prop] : '' }}
              </div>
            </template>
          </th>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, type VNode } from 'vue'
import type { TableProps, TableColumnProps, TableColumnPropsWithSlot } from './types'
import TableColumn from './column.vue'

const props = withDefaults(defineProps<TableProps>(), {
  size: 'md',
  zebra: false,
  pinCols: false,
  border: false,
})

const emit = defineEmits<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (e: 'select-change', items: any[]): void
}>()

const slots = defineSlots<{
  default(): VNode[]
}>()

const processedColumns = computed(() => {
  const defaultSlot = slots.default?.() ?? []

  const regularCols: TableColumnPropsWithSlot[] = []
  const leftPinCols: TableColumnPropsWithSlot[] = []
  const rightPinCols: TableColumnPropsWithSlot[] = []

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

        const headerSlotFn =
          typeof node.children === 'object' &&
          node.children !== null &&
          !Array.isArray(node.children) &&
          typeof node.children.header === 'function'
            ? node.children.header
            : undefined

        const props = node.props as TableColumnProps

        const headerAlignValue = props.headerAlign || node.props['header-align']
        const pinColValue = props.pinCol || node.props['pin-col']

        const theCol = {
          prop: props.prop,
          label: props.label,
          width: props.width,
          headerAlign: headerAlignValue,
          align: props.align,
          defaultSlot: defaultSlotFn,
          headerSlot: headerSlotFn,
          pinCol: pinColValue,
        } as TableColumnPropsWithSlot

        if (pinColValue === 'left') {
          leftPinCols.push(theCol)
        } else if (pinColValue === 'right') {
          rightPinCols.push(theCol)
        } else {
          regularCols.push(theCol)
        }
      }
    })
  }

  extractColumns(defaultSlot)
  return {
    regular: regularCols,
    leftPin: leftPinCols,
    rightPin: rightPinCols,
  }
})

const columns = computed(() => {
  const { leftPin, regular, rightPin } = processedColumns.value
  return [...leftPin, ...regular, ...rightPin]
})
const regularCols = computed(() => processedColumns.value.regular)
const leftPinCols = computed(() => processedColumns.value.leftPin)
const rightPinCols = computed(() => processedColumns.value.rightPin)

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

// ---  select logic  ---
const isSelectAll = ref(false)
const selectedRowsSet = ref(new Set<Record<string, unknown>>())

const selectableData = computed(() => {
  if (!props.selectable) {
    return props.data
  }
  return props.data.filter((item) => props.selectable!(item))
})

const selectedRows = computed(() => {
  return props.data.filter((item) => selectedRowsSet.value.has(item))
})

const handleSelectAllChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  const isChecked = target.checked
  isSelectAll.value = isChecked

  selectedRowsSet.value.clear()

  if (isChecked) {
    selectableData.value.forEach((item) => selectedRowsSet.value.add(item))
  }
  emit('select-change', selectedRows.value)
}

const handleSelect = (event: Event, rowData: Record<string, unknown>) => {
  const target = event.target as HTMLInputElement
  const isChecked = target.checked
  if (isChecked) {
    selectedRowsSet.value.add(rowData)
  } else {
    selectedRowsSet.value.delete(rowData)
  }

  const selectableCount = selectableData.value.length
  // 只有当可选行数量大于0，且选中行的数量等于可选行数量时，才全选
  if (selectableCount > 0 && selectedRows.value.length === selectableCount) {
    isSelectAll.value = true
  } else {
    isSelectAll.value = false
  }
  emit('select-change', selectedRows.value)
}

const getTextAlgin = (algin?: 'left' | 'center' | 'right'): string => {
  switch (algin) {
    case 'left':
      return 'text-left'
    case 'center':
      return 'text-center'
    case 'right':
      return 'text-right'
    default:
      return ''
  }
}
</script>
