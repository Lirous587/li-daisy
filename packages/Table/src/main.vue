<template>
  <div
    class="overflow-x-auto border-base-300 rounded-md li-table"
    tabindex="-1"
    :class="[props.border ? 'border' : '']"
    ref="scrollContainer"
    @scroll="handleScroll"
    :style="{ minHeight: currentMinHeight + 'px' }"
  >
    <table
      class="table table-pin-rows table-pin-cols table-fixed break-words"
      :class="[tableSizeClass, props.border ? 'table-with-border' : '']"
    >
      <colgroup>
        <!-- expand -->
        <col v-if="hasExpand" width="50" />
        <!-- select -->
        <col v-if="props.select" width="50" />
        <!-- left pin  -->
        <col v-for="column in finalLeftPinCols" :key="column.prop" :width="column.finalWidth" />
        <!-- regular -->
        <col v-for="column in finalRegularCols" :key="column.prop" :width="column.finalWidth" />
        <!-- right pin -->
        <col v-for="column in finalRightPinCols" :key="column.prop" :width="column.finalWidth" />
      </colgroup>

      <thead>
        <tr>
          <!-- expand -->
          <th v-if="hasExpand" class="sticky left-0 z-1">
            <span
              v-if="!props.select && leftPinCols.length === 0"
              class="absolute top-0 bottom-0 w-[10px] right-[-10px]"
              :class="scrollState.left ? 'pin-left-shadow' : ''"
            ></span>
          </th>

          <!-- select -->
          <th
            v-if="props.select"
            class="sticky z-1"
            :style="{ left: hasExpand ? 50 : 0 + 'px !important' }"
          >
            <span
              v-if="leftPinCols.length === 0"
              class="absolute top-0 bottom-0 w-[10px] right-[-10px]"
              :class="scrollState.left ? 'pin-left-shadow' : ''"
            ></span>
            <input
              type="checkbox"
              class="checkbox checkbox-sm"
              v-model="isSelectAll"
              @change="handleSelectAllChange"
            />
          </th>

          <th
            v-for="(column, columnIndex) in leftPinCols"
            :key="column.prop"
            class="sticky z-1"
            :style="getPinColumnStyle(columnIndex, column.pinCol)"
          >
            <span
              class="absolute top-0 bottom-0 w-[10px] right-[-10px]"
              :class="scrollState.left ? 'pin-left-shadow' : ''"
            ></span>
            <div class="flex items-center">
              <div :class="getAlgin(column.headerAlign)">
                <template v-if="column.headerSlot">
                  <component :is="column.headerSlot" :label="column.label" :prop="column.prop" />
                </template>
                <template v-else>
                  {{ column.label || column.prop }}
                </template>
              </div>
            </div>
          </th>

          <td v-for="column in regularCols" :key="column.prop" class="z-0">
            <div class="flex items-center">
              <div :class="getAlgin(column.headerAlign)">
                <template v-if="column.headerSlot">
                  <component :is="column.headerSlot" :label="column.label" :prop="column.prop" />
                </template>
                <template v-else>
                  {{ column.label || column.prop }}
                </template>
              </div>
            </div>
          </td>

          <th
            v-for="(column, columnIndex) in rightPinCols"
            :key="column.prop"
            class="sticky z-1"
            :style="getPinColumnStyle(columnIndex, column.pinCol)"
          >
            <span
              class="absolute top-0 bottom-0 w-[10px] left-[-10px]"
              :class="scrollState.right ? ' pin-right-shadow' : ''"
            ></span>
            <div class="flex items-center">
              <div :class="getAlgin(column.headerAlign)">
                <template v-if="column.headerSlot">
                  <component :is="column.headerSlot" :label="column.label" :prop="column.prop" />
                </template>
                <template v-else>
                  {{ column.label || column.prop }}
                </template>
              </div>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <template v-for="(item, rowIndex) in props.data" :key="generateRowKey(item, rowIndex)">
          <tr :class="[handleZebraStyle(rowIndex), handleHoverHightlight()]">
            <!-- expand -->
            <th v-if="hasExpand" class="sticky left-0 z-1">
              <span
                v-if="!props.select && leftPinCols.length === 0"
                class="absolute top-0 bottom-0 w-[10px] right-[-10px]"
                :class="scrollState.left ? 'pin-left-shadow' : ''"
              ></span>
              <label class="swap swap-rotate">
                <input type="checkbox" @change="toggleExpand(item)" />
                <ChevronDownIcon class="swap-on w-5 h-5" />
                <ChevronRightIcon class="swap-off w-5 h-5" />
              </label>
            </th>

            <!-- 选择单元格 -->
            <th
              v-if="props.select"
              class="sticky z-1"
              :style="{ left: hasExpand ? 50 : 0 + 'px !important' }"
            >
              <span
                v-if="leftPinCols.length === 0"
                class="absolute top-0 bottom-0 w-[10px] right-[-10px]"
                :class="scrollState.left ? 'pin-left-shadow' : ''"
              ></span>
              <input
                type="checkbox"
                class="checkbox checkbox-sm"
                :checked="selectedRowsSet.has(item)"
                @change="handleSelect($event, item)"
                :disabled="props.selectable ? !props.selectable?.(item) : false"
              />
            </th>

            <!-- left -->
            <th
              v-for="(column, leftIndex) in leftPinCols"
              :key="column.prop"
              :style="getPinColumnStyle(leftIndex, column.pinCol)"
              class="sticky z-1"
            >
              <span
                class="absolute top-0 bottom-0 w-[10px] right-[-10px]"
                :class="scrollState.left ? 'pin-left-shadow' : ''"
              ></span>
              <OverflowTip v-if="column.tooltip" :content="column.prop ? item[column.prop] : ''">
                <template v-if="column.defaultSlot">
                  <component :is="column.defaultSlot" :row="item" :index="rowIndex" />
                </template>
                <template v-else>
                  {{ column.prop ? item[column.prop] : '' }}
                </template>
              </OverflowTip>
              <div v-else class="flex items-center">
                <div :class="getAlgin(column.align)">
                  <template v-if="column.defaultSlot">
                    <component :is="column.defaultSlot" :row="item" :index="rowIndex" />
                  </template>
                  <template v-else>
                    {{ column.prop ? item[column.prop] : '' }}
                  </template>
                </div>
              </div>
            </th>

            <td v-for="column in regularCols" :key="column.prop" class="z-0">
              <OverflowTip v-if="column.tooltip" :content="column.prop ? item[column.prop] : ''">
                <template v-if="column.defaultSlot">
                  <component :is="column.defaultSlot" :row="item" :index="rowIndex" />
                </template>
                <template v-else>
                  {{ column.prop ? item[column.prop] : '' }}
                </template>
              </OverflowTip>
              <div v-else class="flex items-center">
                <div :class="getAlgin(column.align)">
                  <template v-if="column.defaultSlot">
                    <component :is="column.defaultSlot" :row="item" :index="rowIndex" />
                  </template>
                  <template v-else>
                    {{ column.prop ? item[column.prop] : '' }}
                  </template>
                </div>
              </div>
            </td>

            <!-- right -->
            <th
              v-for="(column, rightIndex) in rightPinCols"
              :key="column.prop"
              :style="getPinColumnStyle(rightIndex, column.pinCol)"
              class="sticky z-1"
            >
              <span
                class="absolute top-0 bottom-0 w-[10px] left-[-10px]"
                :class="scrollState.right ? 'pin-right-shadow' : ''"
              ></span>
              <OverflowTip v-if="column.tooltip" :content="column.prop ? item[column.prop] : ''">
                <template v-if="column.defaultSlot">
                  <component :is="column.defaultSlot" :row="item" :index="rowIndex" />
                </template>
                <template v-else>
                  {{ column.prop ? item[column.prop] : '' }}
                </template>
              </OverflowTip>
              <div v-else class="flex items-center">
                <div :class="getAlgin(column.align)">
                  <template v-if="column.defaultSlot">
                    <component :is="column.defaultSlot" :row="item" :index="rowIndex" />
                  </template>
                  <template v-else>
                    {{ column.prop ? item[column.prop] : '' }}
                  </template>
                </div>
              </div>
            </th>
          </tr>

          <!-- expand rows -->
          <tr v-if="expandedRowsSet.has(item)">
            <td :colspan="totalColumnsCount">
              <component :is="expandSlot" :row="item" :index="rowIndex" />
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, type VNode, watch } from 'vue'
import type {
  TableProps,
  TableColumnProps,
  TableColumnPropsWithSlot,
  TableSlotFunction,
} from './types'
import TableColumn from './column.vue'
import { ChevronRightIcon, ChevronDownIcon } from '@heroicons/vue/24/outline'
import OverflowTip from './overflowTip.vue'

const props = withDefaults(defineProps<TableProps>(), {
  size: 'md',
  zebra: false,
  border: false,
  hoverHighlight: true,
  placeholderHeight: 300,
})

const emit = defineEmits<{
  (e: 'select-change', items: any[]): void
}>()

const slots = defineSlots<{
  default(): VNode[]
}>()

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const generateRowKey = (item: any, index: number): string => {
  // 如果有有效的id，直接使用
  if (item.id !== undefined && item.id !== null && item.id !== '') {
    return `row-${item.id}`
  }

  // 没有id时，使用索引和内容hash生成稳定的key
  const contentHash = JSON.stringify(item).substring(0, 20)
  return `row-${index}-${contentHash}`
}

const processedColumns = computed(() => {
  const defaultSlot = slots.default ? slots.default() : []

  const leftPinCols: TableColumnPropsWithSlot[] = []
  const regularCols: TableColumnPropsWithSlot[] = []
  const rightPinCols: TableColumnPropsWithSlot[] = []

  // 用于存储找到的 expand 列的插槽函数
  let expandSlot: TableSlotFunction | undefined = undefined

  const extractColumns = (nodes: VNode[]) => {
    nodes.forEach((node) => {
      if (node.type === TableColumn && node.props) {
        // 步骤 1: 检查 node.children 是否是有效的插槽对象
        const isValidSlotsObject =
          typeof node.children === 'object' &&
          node.children !== null &&
          !Array.isArray(node.children)

        let defaultSlotFn: TableSlotFunction | undefined = undefined
        let headerSlotFn: TableSlotFunction | undefined = undefined

        const nodeProps = node.props as TableColumnProps

        // 步骤 2: 如果是有效对象，则获取插槽函数
        if (isValidSlotsObject) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const childrenSlots = node.children as Record<string, any> // 类型断言

          // 获取 default 插槽
          if (typeof childrenSlots.default === 'function') {
            defaultSlotFn = childrenSlots.default as TableSlotFunction
          }

          // 获取 header 插槽
          if (typeof childrenSlots.header === 'function') {
            headerSlotFn = childrenSlots.header as TableSlotFunction
          }

          // 获取 expand 插槽
          if (typeof childrenSlots.expand === 'function' && nodeProps.type === 'expand') {
            expandSlot = childrenSlots.expand as TableSlotFunction
          }
        }

        const headerAlignValue = nodeProps.headerAlign || node.props['header-align']
        const pinColValue = nodeProps.pinCol || node.props['pin-col']

        const rawTooltipProp = node.props['tooltip']
        // 如果原始值是 true 或者 空字符串 '', 则 tooltipValue 为 true，否则为 false
        const tooltipValue = rawTooltipProp === true || rawTooltipProp === ''

        const theCol = {
          prop: nodeProps.prop,
          label: nodeProps.label,
          width: nodeProps.width,
          headerAlign: headerAlignValue,
          align: nodeProps.align,
          type: nodeProps.type,
          defaultSlot: defaultSlotFn,
          headerSlot: headerSlotFn,
          pinCol: pinColValue,
          tooltip: tooltipValue,
        } as TableColumnPropsWithSlot

        if (theCol.type !== 'expand') {
          if (theCol.pinCol === 'left') {
            leftPinCols.push(theCol)
          } else if (theCol.pinCol === 'right') {
            rightPinCols.push(theCol)
          } else {
            regularCols.push(theCol)
          }
        }
      }
    })
  }
  extractColumns(defaultSlot)
  return {
    leftPinCols,
    regularCols,
    rightPinCols,
    expandSlot,
  }
})

const leftPinCols = computed(() => processedColumns.value.leftPinCols)
const regularCols = computed(() => processedColumns.value.regularCols)
const rightPinCols = computed(() => processedColumns.value.rightPinCols)
const expandSlot = computed(() => processedColumns.value.expandSlot)

// zebra
const handleZebraStyle = (index: number) => {
  return props.zebra && index % 2 === 0
    ? 'bg-base-200 [&>th]:bg-base-200'
    : 'bg-base-100 [&>th]:bg-base-100'
}

const handleHoverHightlight = () => {
  return props.hoverHighlight ? 'hover:bg-base-200 hover:[&>th]:bg-base-200' : ''
}

// --- expand ---
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type RowType = Record<string, any>
const expandedRowsSet = ref(new Set<RowType>())

const toggleExpand = (row: RowType) => {
  if (expandedRowsSet.value.has(row)) {
    expandedRowsSet.value.delete(row)
  } else {
    expandedRowsSet.value.add(row)
  }
}

const totalColumnsCount = computed(() => {
  let count = 1
  count += leftPinCols.value.length
  count += regularCols.value.length
  count += rightPinCols.value.length
  if (props.select) {
    count += 1
  }
  return count
})

const hasExpand = computed(() => !!expandSlot.value)

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

const selectedRowsSet = ref(new Set<Record<string, any>>())

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleSelect = (event: Event, rowData: Record<string, any>) => {
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

// ---  样式计算 ---
const getAlgin = (algin?: 'left' | 'center' | 'right'): string => {
  switch (algin) {
    case 'left':
      return 'mr-auto'
    case 'center':
      return 'mx-auto'
    case 'right':
      return 'ml-auto'
    default:
      return 'mx-auto'
  }
}

// pin cols computed
const scrollContainer = ref<HTMLDivElement | null>(null)
const containerWidth = ref(0) // 存储容器宽度
const scrollState = ref({ left: false, right: false })

// --- Scroll Handling Function ---
const handleScroll = () => {
  // 获取滚动容器的 DOM 元素
  const el = scrollContainer.value
  if (!el) return

  // 定义一个小的阈值，防止在边缘时状态闪烁
  const threshold = 1 // 1 像素

  // 更新左侧状态：如果向左滚动的距离大于阈值，则为 true
  scrollState.value.left = el.scrollLeft > threshold

  // 更新右侧状态：如果距离滚动到最右端的剩余距离大于阈值，则为 true
  // 剩余距离 = (总内容宽度 - 可视宽度) - 已向左滚动距离
  scrollState.value.right = el.scrollWidth - el.clientWidth - el.scrollLeft > threshold
}

// --- 计算最终列宽 ---
const finalProcessedColumns = computed(() => {
  const totalAvailableWidth = containerWidth.value

  // 如果容器宽度无效 暂时返回原始列或带默认宽度的列
  if (totalAvailableWidth <= 0) {
    const defaultWidth = 100

    const finalLeftPinCols = leftPinCols.value.map((col) => ({
      ...col,
      finalWidth: col.width || defaultWidth,
    }))
    const finalRegularCols = regularCols.value.map((col) => ({
      ...col,
      finalWidth: col.width || defaultWidth,
    }))
    const finalRightPinCols = rightPinCols.value.map((col) => ({
      ...col,
      finalWidth: col.width || defaultWidth,
    }))

    return {
      finalLeftPinCols,
      finalRegularCols,
      finalRightPinCols,
    }
  }

  let fixedWidthSum = 0
  let autoWidthCount = 0
  const allCols = [...leftPinCols.value, ...regularCols.value, ...rightPinCols.value]

  // 加上 expand 和 select 列的宽度
  if (hasExpand.value) fixedWidthSum += 50
  if (props.select) fixedWidthSum += 50

  // 遍历所有列，累加固定宽度，统计自动宽度列数
  allCols.forEach((col) => {
    if (col.width) {
      fixedWidthSum += col.width
    } else {
      // 自动宽度列
      autoWidthCount++
    }
  })

  const remainingWidth = totalAvailableWidth - fixedWidthSum
  // 计算平均宽度，设置最小宽度为100px
  const averageWidth = autoWidthCount > 0 ? Math.max(120, remainingWidth / autoWidthCount) : 0

  // 辅助函数，计算最终宽度
  const calculateFinalWidth = (col: TableColumnPropsWithSlot): number => {
    if (col.width) {
      return col.width
    } else {
      // 为边框和间距预留更精确的空间
      // const borderOffset = 2 // 每列预留2px用于边框和间距
      return Math.floor(averageWidth)
    }
  }

  const finalLeftPinCols = leftPinCols.value.map((col) => ({
    ...col,
    finalWidth: calculateFinalWidth(col),
  }))

  const finalRegularCols = regularCols.value.map((col) => ({
    ...col,
    finalWidth: calculateFinalWidth(col),
  }))
  const finalRightPinCols = rightPinCols.value.map((col) => ({
    ...col,
    finalWidth: calculateFinalWidth(col),
  }))

  // 返回带有 finalWidth 的新列数组
  return {
    finalLeftPinCols,
    finalRegularCols,
    finalRightPinCols,
  }
})

// --- 在模板和 getPinColumnStyle 中使用的最终列数据 ---
const finalLeftPinCols = computed(() => finalProcessedColumns.value.finalLeftPinCols)
const finalRegularCols = computed(() => finalProcessedColumns.value.finalRegularCols)
const finalRightPinCols = computed(() => finalProcessedColumns.value.finalRightPinCols)

//  getPinColumnStyle
const getPinColumnStyle = (index: number, direction: 'left' | 'right' | undefined) => {
  if (direction === 'left') {
    // 基础偏移：Select 列和 Expand 列的宽度
    const baseOffset = (props.select ? 50 : 0) + (hasExpand.value ? 50 : 0)
    let precedingWidthSum = 0
    for (let i = 0; i < index; i++) {
      // 使用 finalLeftPinCols 和 finalWidth
      precedingWidthSum += finalLeftPinCols.value[i]?.finalWidth
    }
    const offset = baseOffset + precedingWidthSum
    return { left: offset + 'px !important' }
  }
  if (direction === 'right') {
    let succeedingWidthSum = 0
    for (let i = index + 1; i < finalRightPinCols.value.length; i++) {
      // 使用 finalRightPinCols 和 finalWidth
      succeedingWidthSum += finalRightPinCols.value[i]?.finalWidth
    }
    const offset = succeedingWidthSum
    return { right: offset + 'px !important' }
  }
}

// --- 更新容器宽度函数 ---
const updateContainerWidth = () => {
  if (scrollContainer.value) {
    containerWidth.value = scrollContainer.value.clientWidth
  }
}

let resizeObserver: ResizeObserver | null = null

let cleanupFunctions: (() => void)[] = []

// 监听props 计算列宽
watch(
  [() => props.data, () => props.select, slots.default, leftPinCols, regularCols, rightPinCols],
  () => {
    // 当列定义或数据变化时，最终宽度计算会自动更新 (因为 finalProcessedColumns 依赖它们)
    // 我们只需要确保在 DOM 更新后重新检查滚动状态
    nextTick(handleScroll)
  },
  { deep: true, immediate: true },
)

// 容器最小高度逻辑
// 维护一个 lastValidHeight 用于props.data变化前的高度
// currentMinHeight 用于得出实际要占位高度
const lastValidHeight = ref(0) // 记录上一次的有效高度
const currentMinHeight = computed(() => {
  // 有数据时才采取最小高度
  if (!props.data || props.data.length === 0) {
    return lastValidHeight.value || props.placeholderHeight
  }
  return 0
})

// 记录表格高度
const recordTableHeight = () => {
  nextTick(() => {
    // 有data时才有意义
    if (scrollContainer.value && props.data && props.data.length > 0) {
      lastValidHeight.value = scrollContainer.value.scrollHeight
    }
  })
}

// 监听data 处理minHeight
watch(
  () => props.data.length,
  () => {
    recordTableHeight()
  },
)

onMounted(() => {
  updateContainerWidth()
  handleScroll()
  recordTableHeight()

  // 设置 ResizeObserver
  if (scrollContainer.value && typeof ResizeObserver !== 'undefined') {
    resizeObserver = new ResizeObserver(() => {
      updateContainerWidth() // 容器尺寸变化时更新宽度
      handleScroll() // 尺寸变化可能影响滚动条，重新检查
    })
    resizeObserver.observe(scrollContainer.value)

    // 添加清理函数
    cleanupFunctions.push(() => {
      if (resizeObserver) {
        resizeObserver.disconnect()
        resizeObserver = null
      }
    })
  } else {
    window.addEventListener('resize', updateContainerWidth)
    window.addEventListener('resize', handleScroll)

    // 添加清理函数
    cleanupFunctions.push(() => {
      window.removeEventListener('resize', updateContainerWidth)
      window.removeEventListener('resize', handleScroll)
    })
  }
})

onBeforeUnmount(() => {
  cleanupFunctions.forEach((cleanup) => cleanup())
  cleanupFunctions = []
})
</script>

<style scoped>
.pin-left-shadow {
  box-shadow: inset 10px 0 10px -10px oklch(0% 0 0 / 0.15);
}
.pin-right-shadow {
  box-shadow: inset -10px 0 10px -10px oklch(0% 0 0 / 0.15);
}

.dark .pin-left-shadow {
  box-shadow: inset 10px 0 10px -10px oklch(100% 0 0 / 0.15);
}
.dark .pin-right-shadow {
  box-shadow: inset -10px 0 10px -10px oklch(100% 0 0 / 0.15);
}

/* 定位处理 避免覆盖table类的pin-cols */
.table-with-border td:not(.sticky),
.table-with-border th:not(.sticky) {
  position: relative;
}

.table-with-border .sticky {
  position: sticky !important;
}

/* 只有当 table 有 table-with-border 类时才显示边框 */

/* 右边框 */
.table-with-border td::after,
.table-with-border th::after {
  content: '';
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: var(--border);
  background-color: color-mix(in oklch, var(--color-base-content) 5%, #0000);
  pointer-events: none;
  z-index: 1;
}

/* 最后一列不需要右边框 */
.table-with-border td:last-child::after,
.table-with-border th:last-child::after {
  display: none;
}

/* 固定列的边框需要更高的 z-index */
.table-with-border .sticky::after {
  z-index: 2;
}
</style>
