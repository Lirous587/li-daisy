<template>
  <div
    ref="scrollContainer"
    class="overflow-auto bg-base-100 border-base-content/10"
    :class="[props.border ? 'rounded-box border' : 'border-y']"
    @scroll="handleScroll"
  >
    <table
      class="table table-pin-rows table-pin-cols"
      :class="[props.zebra ? '!table-zebra' : '', tableSizeClass]"
    >
      <thead>
        <tr class="relative">
          <!-- 固定选择列 -->
          <th v-if="props.select" class="!pl-4 !p-1 w-0 sticky z-10 left-0">
            <input
              type="checkbox"
              class="checkbox checkbox-sm"
              v-model="isSelectAll"
              @change="handleSelectAllChange"
            />
          </th>

          <!-- 左固定列头 -->
          <th
            v-for="(column, index) in leftPinCols"
            :key="'header-left-' + index"
            class="sticky z-10"
            :style="{ width: column.width, left: (index + 1) * 40 + 'px !important' }"
          >
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

          <!-- 普通列头 -->
          <th
            v-for="(column, index) in regularCols"
            :key="'header-regular-' + index"
            :style="{ width: column.width }"
            class="z-0"
          >
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

          <!-- 右固定列头 -->
          <th
            v-for="(column, index) in rightPinCols"
            :key="'header-right-' + index"
            class="sticky z-10"
            :style="{
              width: column.width,
              right: (rightPinCols.length - index - 1) * 40 + 'px !important',
            }"
          >
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
          <!-- 固定选择列单元格 -->
          <th v-if="props.select" class="!pl-4 !p-1 w-0 sticky left-0 z-10">
            <input
              type="checkbox"
              class="checkbox checkbox-sm"
              :checked="selectedRowsSet.has(item)"
              @change="handleSelect($event, item)"
              :disabled="props.selectable ? props.selectable?.(item) : false"
            />
          </th>

          <!-- 左固定列单元格 -->
          <th
            v-for="(column, columnIndex) in leftPinCols"
            :key="column.prop"
            class="sticky z-10"
            :style="{ width: column.width, left: (columnIndex + 1) * 40 + 'px !important' }"
          >
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

          <!-- 普通列单元格 -->
          <td v-for="column in regularCols" :key="column.prop" class="z-0">
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

          <!-- 右固定列单元格 -->
          <th
            v-for="(column, columnIndex) in rightPinCols"
            :key="column.prop"
            class="sticky z-10"
            :style="{
              width: column.width,
              right: (rightPinCols.length - columnIndex - 1) * 40 + 'px !important',
            }"
          >
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
import { computed, onBeforeUnmount, onMounted, ref, type VNode } from 'vue'
import type { TableProps, TableColumnProps, TableColumnPropsWithSlot } from './types'
import TableColumn from './column.vue'

const props = withDefaults(defineProps<TableProps>(), {
  size: 'md',
  zebra: false,
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
  console.log(props.data)

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

// --- Refs and State ---
const scrollContainer = ref<HTMLDivElement | null>(null) // Ref for the scrollable div
const scrollState = ref({ left: false, right: false }) // State for shadow visibility

// --- Scroll Handling ---
const handleScroll = () => {
  const el = scrollContainer.value
  if (!el) return

  const threshold = 1 // Small threshold to avoid flickering at edges
  scrollState.value.left = el.scrollLeft > threshold
  scrollState.value.right = el.scrollWidth - el.clientWidth - el.scrollLeft > threshold
}

onMounted(() => {
  handleScroll()
})

onBeforeUnmount(() => {})
</script>
