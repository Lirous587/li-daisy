<template>
  <div v-if="props.hrefGenerator || props.preHref" class="sr-only">
    <!-- 明确的上一页链接 (如果不在第一页) -->
    <a v-if="safeCurrentPage > 1" :href="generateSeoHref(safeCurrentPage - 1)">Previous Page</a>
    <!-- 明确的下一页链接 (如果不在最后一页) -->
    <a v-if="safeCurrentPage < pages" :href="generateSeoHref(safeCurrentPage + 1)">Next Page</a>
  </div>

  <div
    v-if="pageConfim()"
    v-bind="$attrs"
    class="flex cursor-pointer select-none font-mono relative *:border-y *:border-x li-join"
    :class="[props.hideOnSinglePage && props.pages === 1 ? 'hidden' : '']"
  >
    <!-- last -->
    <button
      v-if="showIcon"
      class="li-btn li-btn-square li-join-item"
      :class="[btnSize, btnColor, btnSoft]"
      :disabled="ifMin"
      @click="changePage(Math.max(1, safeCurrentPage - 1))"
    >
      <ArrowLeftIcon class="m-auto w-3 h-3" />
    </button>

    <!-- middle -->
    <button
      v-for="(item, index) in list"
      :key="index"
      class="li-btn li-join-item"
      :class="[btnSize, btnColor, btnSoft, item.page == currentPage ? 'li-btn-active' : '']"
      @click="changePage(item.page)"
    >
      <span class="m-auto"> {{ item.value }}</span>
    </button>

    <!-- next -->
    <button
      v-if="showIcon"
      class="li-btn li-btn-square li-join-item"
      :class="[btnSize, btnColor, btnSoft]"
      :disabled="ifMax"
      @click="changePage(Math.min(pages, safeCurrentPage + 1))"
    >
      <ArrowRightIcon class="m-auto h-3 w-3" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/vue/24/outline'
import type { PagingProps, PagingItem, PagingRef } from './types'
import { formatUrl } from '../../utils/format.ts'
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<PagingProps>(), {
  pages: 1,
  size: 'md',
  color: 'base',
  soft: true,
  hideOnSinglePage: false,
  offset: 1,
  icon: true,
  hideIconOnSm: true,
})

const currentPage = defineModel<number | undefined>('modelValue', {
  required: true,
})

const btnSize = computed(() => {
  switch (props.size) {
    case 'xs':
      return 'li-btn-xs'
    case 'sm':
      return 'li-btn-sm'
    case 'md':
      return 'li-btn-md'
    case 'lg':
      return 'li-btn-lg'
    case 'xl':
      return 'li-btn-xl'
    default:
      return 'li-btn-sm'
  }
})

const btnColor = computed(() => {
  switch (props.color) {
    case 'base':
      return 'li-btn'
    case 'neutral':
      return 'li-btn-neutral'
    case 'primary':
      return 'li-btn-primary'
    case 'secondary':
      return 'li-btn-secondary'
    case 'accent':
      return 'li-btn-accent'
    case 'info':
      return 'li-btn--info'
    case 'success':
      return 'li-btn--success'
    case 'warning':
      return 'li-btn-warning'
    case 'error':
      return 'li-btn-error'
    default:
      return 'li-btn'
  }
})

const showIcon = computed(() => {
  // 如果 icon 为 false,直接不显示
  if (!props.icon) return false

  // 如果不需要在小屏隐藏,直接显示
  if (!props.hideIconOnSm) return true

  // 如果需要在小屏隐藏,则根据屏幕尺寸决定
  return !isSmallScreen.value
})

const btnSoft = computed(() => {
  if (props.soft) return 'li-btn-soft'
  return 'shadow-none'
})

const isSmallScreen = ref(false)

const checkScreenSize = () => {
  isSmallScreen.value = window.innerWidth < 640
}

const ifMin = computed(() => {
  return currentPage.value === 1 ? true : false
})

const ifMax = computed(() => {
  return currentPage.value === props.pages ? true : false
})

const generateSeoHref = (page: number): string => {
  if (props.hrefGenerator) {
    // 如果提供了生成器函数，优先使用它
    return props.hrefGenerator(page)
  } else if (props.preHref) {
    // 否则，回退到 preHref + page 的方式
    return formatUrl(props.preHref) + page
  } else {
    // 如果两者都未提供（理论上不应发生，因为外层有 v-if），返回安全值
    console.warn('Paging component: Neither hrefGenerator nor preHref provided for SEO links.')
    return '#'
  }
}

const emit = defineEmits<{
  change: [page: number]
}>()

const safeCurrentPage = computed(() => currentPage.value || 1)

const offsetValue = computed(() => props.offset)
const list = ref<PagingItem[]>([])

const pageConfim = (): boolean => {
  return typeof props.pages === 'number'
}

const initList = (): PagingItem[] => {
  if (!pageConfim()) return []

  // 页数较少时直接返回所有页码
  if (props.pages <= 3 + offsetValue.value * 2) {
    return Array.from({ length: props.pages }, (_, i): PagingItem => {
      const pageNum = i + 1
      return {
        value: pageNum,
        page: pageNum,
      }
    })
  }

  const result: PagingItem[] = [{ value: 1, page: 1 }] // 始终显示第一页

  // 计算中间部分页码
  const start = Math.max(2, safeCurrentPage.value - offsetValue.value)
  const end = Math.min(props.pages - 1, safeCurrentPage.value + offsetValue.value)

  // 前省略号跳转
  if (start > 2) {
    const jumpTarget = Math.max(1, safeCurrentPage.value - offsetValue.value - 1)
    result.push({ value: '...', page: jumpTarget })
  }

  // 添加中间页码
  for (let i = start; i <= end; i++) {
    result.push({ value: i, page: i })
  }

  // 后省略号跳转
  if (end < props.pages - 1) {
    const jumpTarget = Math.min(props.pages, safeCurrentPage.value + offsetValue.value + 1)
    result.push({ value: '...', page: jumpTarget })
  }

  // 添加最后一页
  result.push({ value: props.pages, page: props.pages })

  return result
}

watch([() => currentPage.value, () => props.offset, () => props.pages], () => {
  list.value = initList()
})

// 确保ssr渲染
list.value = initList()

const changePage = (page: number) => {
  console.log(1)

  emit('change', page)
  currentPage.value = page
}

const exposeObject: PagingRef = {
  change: changePage,
  pages: props.pages,
  currentPage: safeCurrentPage.value,
}

defineExpose(exposeObject)

onMounted(() => {
  checkScreenSize()
  window.addEventListener('resize', checkScreenSize)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkScreenSize)
})
</script>
