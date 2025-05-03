<template>
  <div
    class="overflow-auto bg-base-100 border-base-content/10"
    :class="[props.border ? 'rounded-box border' : 'border-y']"
    ref="scrollContainer"
    @scroll="handleScroll"
  >
    <table
      class="table table-pin-rows table-pin-cols"
      :class="[props.zebra ? '!table-zebra' : '', tableSizeClass]"
    >
      <thead>
        <tr>
          <!-- 全部选择 -->
          <th v-if="props.select" class="w-0 sticky z-10 left-0" ref="selectRef">
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
            class="sticky z-10"
            :style="getColumnStyle(columnIndex, column.pinCol)"
            :ref="(el) => setTheadThRef(el, column.pinCol)"
          >
            <span
              class="absolute top-0 bottom-0 w-[10px] right-[-10px]"
              :class="scrollState.left ? 'pin-left-shadow' : ''"
            ></span>
            <div class="flex items-center" :style="{ width: column.width + '!important' }">
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
            <div class="flex items-center" :style="{ width: column.width + '!important' }">
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
            class="sticky z-10"
            :style="getColumnStyle(columnIndex, column.pinCol)"
            :ref="(el) => setTheadThRef(el, column.pinCol)"
          >
            <span
              class="absolute top-0 bottom-0 w-[10px] left-[-10px]"
              :class="scrollState.right ? ' pin-right-shadow' : ''"
            ></span>
            <div class="flex items-center" :style="{ width: column.width + '!important' }">
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
        <tr v-for="(item, index) in props.data" :key="index">
          <!-- 选择单元格 -->
          <th v-if="props.select" class="!pl-4 !p-1 w-0 sticky left-0 z-10">
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
              :disabled="props.selectable ? props.selectable?.(item) : false"
            />
          </th>

          <th
            v-for="(column, columnIndex) in leftPinCols"
            :key="column.prop"
            :style="getColumnStyle(columnIndex, column.pinCol)"
          >
            <span
              class="absolute top-0 bottom-0 w-[10px] right-[-10px]"
              :class="scrollState.left ? 'pin-left-shadow' : ''"
            ></span>
            <div class="flex items-center" :style="{ width: column.width + '!important' }">
              <div :class="getAlgin(column.align)">
                <template v-if="column.defaultSlot">
                  <component :is="column.defaultSlot" :row="item" :index="index" />
                </template>
                <template v-else>
                  {{ column.prop ? item[column.prop] : '' }}
                </template>
              </div>
            </div>
          </th>

          <td v-for="column in regularCols" :key="column.prop" class="z-0">
            <div class="flex items-center" :style="{ width: column.width + '!important' }">
              <div :class="getAlgin(column.headerAlign)">
                <template v-if="column.defaultSlot">
                  <component :is="column.defaultSlot" :row="item" :index="index" />
                </template>
                <template v-else>
                  {{ column.prop ? item[column.prop] : '' }}
                </template>
              </div>
            </div>
          </td>

          <th
            v-for="(column, columnIndex) in rightPinCols"
            :key="column.prop"
            :style="getColumnStyle(columnIndex, column.pinCol)"
          >
            <span
              class="absolute top-0 bottom-0 w-[10px] left-[-10px]"
              :class="scrollState.right ? 'pin-right-shadow' : ''"
            ></span>
            <div class="flex items-center" :style="{ width: column.width + '!important' }">
              <div :class="getAlgin(column.align)">
                <template v-if="column.defaultSlot">
                  <component :is="column.defaultSlot" :row="item" :index="index" />
                </template>
                <template v-else>
                  {{ column.prop ? item[column.prop] : '' }}
                </template>
              </div>
            </div>
          </th>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import {
  computed,
  nextTick,
  onBeforeUpdate,
  onMounted,
  ref,
  type VNode,
  type ComponentPublicInstance,
  watch,
  onBeforeUnmount,
} from 'vue'
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

  const leftPinCols: TableColumnPropsWithSlot[] = []
  const regularCols: TableColumnPropsWithSlot[] = []
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
    leftPinCols,
    regularCols,
    rightPinCols,
  }
})

const leftPinCols = computed(() => processedColumns.value.leftPinCols)
const regularCols = computed(() => processedColumns.value.regularCols)
const rightPinCols = computed(() => processedColumns.value.rightPinCols)

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

// --- 样式 ---
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

// --- Refs for TH Elements ---
const leftThRefs = ref<HTMLElement[]>([])
const rightThRefs = ref<HTMLElement[]>([])
// --- Refs for Calculated Widths ---
const leftPinWidths = ref<number[]>([])
const rightPinWidths = ref<number[]>([])

const selectRef = ref<HTMLElement>()
const selectColWidth = ref(0)

// 修改 el 的类型以匹配 ref 函数提供的类型
const setTheadThRef = (
  el: Element | ComponentPublicInstance | null,
  direction: 'left' | 'right' | undefined,
) => {
  if (el instanceof HTMLElement) {
    if (direction === 'left') {
      leftThRefs.value.push(el)
    }
    if (direction === 'right') {
      rightThRefs.value.push(el)
    }
  }
}

onBeforeUpdate(() => {
  leftThRefs.value = []
  rightThRefs.value = []
})

// --- Update Width Arrays ---
const updateWidthArrays = () => {
  leftPinWidths.value = leftThRefs.value.map((thElement) => {
    if (thElement && typeof thElement.getBoundingClientRect === 'function') {
      return thElement.getBoundingClientRect().width
    }
    return 0
  })

  rightPinWidths.value = rightThRefs.value.map((thElement) => {
    if (thElement && typeof thElement.getBoundingClientRect === 'function') {
      return thElement.getBoundingClientRect().width
    }
    return 0
  })

  if (selectRef.value && typeof selectRef.value.getBoundingClientRect === 'function') {
    selectColWidth.value = selectRef.value.getBoundingClientRect().width
  }
}

const getColumnStyle = (index: number, direction: 'left' | 'right' | undefined) => {
  if (direction === 'left') {
    const baseOffset = props.select ? selectColWidth.value : 0
    // 使用 slice 获取索引为 0 到 index-1 的宽度，然后用 reduce 求和
    const precedingWidthSum = leftPinWidths.value
      .slice(0, index) // 获取当前列之前的所有宽度
      .reduce((sum, width) => sum + (width || 0), 0) // 累加求和，处理可能的 undefined

    const offset = baseOffset + precedingWidthSum

    return {
      left: offset + 'px !important',
    }
  }
  if (direction === 'right') {
    const offset = rightPinWidths.value
      .slice(index + 1) // 获取当前列之后的所有宽度
      .reduce((sum, width) => sum + (width || 0), 0)

    return {
      right: offset + 'px !important',
    }
  }
}

const scrollContainer = ref<HTMLDivElement | null>(null)
const scrollState = ref({ left: false, right: false })

// --- Scroll Handling Function ---
const handleScroll = () => {
  // 获取滚动容器的 DOM 元素
  const el = scrollContainer.value
  // 如果元素不存在，则退出
  if (!el) return

  // 定义一个小的阈值，防止在边缘时状态闪烁
  const threshold = 1 // 1 像素

  // 更新左侧状态：如果向左滚动的距离大于阈值，则为 true
  scrollState.value.left = el.scrollLeft > threshold

  // 更新右侧状态：如果距离滚动到最右端的剩余距离大于阈值，则为 true
  // 剩余距离 = (总内容宽度 - 可视宽度) - 已向左滚动距离
  scrollState.value.right = el.scrollWidth - el.clientWidth - el.scrollLeft > threshold
}

onMounted(async () => {
  // 初始计算宽度
  await nextTick(updateWidthArrays)
  // 添加 resize 监听器
  window.addEventListener('resize', updateWidthArrays)
  handleScroll()
})

onBeforeUnmount(() => {
  // 移除 resize 监听器
  window.removeEventListener('resize', updateWidthArrays)
})

// 监听列定义的变化
watch(
  // 监听决定列结构的计算属性
  [leftPinCols, rightPinCols, () => props.select], // 也监听 select 状态，因为它影响 baseOffset
  async () => {
    // 当列或 select 状态变化后，DOM 会更新，refs 会被重新收集
    // 在下一个 tick 中更新宽度数组
    await nextTick(updateWidthArrays)
    // 列变化可能影响滚动状态，重新检查
    handleScroll()
  },
  { deep: true }, // 使用 deep watch 以防列对象内部属性变化（虽然这里可能不需要）
)
</script>

<style scoped>
.pin-left-shadow {
  /* 使用固定的半透明黑色 */
  box-shadow: inset 10px 0 10px -10px oklch(0% 0 0 / 0.15);
}
.pin-right-shadow {
  /* 使用固定的半透明黑色 */
  box-shadow: inset -10px 0 10px -10px oklch(0% 0 0 / 0.15);
}

.dark .pin-left-shadow {
  box-shadow: inset 10px 0 10px -10px oklch(100% 0 0 / 0.15);
}
.dark .pin-right-shadow {
  box-shadow: inset -10px 0 10px -10px oklch(100% 0 0 / 0.15);
}
</style>
