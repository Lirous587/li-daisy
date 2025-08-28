<template>
  <div>
    <div class="sr-only" v-if="props.hrefGenerator || props.preHref">
      <!-- 明确的上一页链接 (如果不在第一页) -->
      <a v-if="currentPage > 1" :href="generateSeoHref(currentPage - 1)">Previous Page</a>
      <!-- 明确的下一页链接 (如果不在最后一页) -->
      <a v-if="currentPage < pages" :href="generateSeoHref(currentPage + 1)">Next Page</a>
    </div>

    <div
      class="flex *:border-y [&>*:first-child]:border-l *:border-r [&>*:first-child]:rounded-l-md [&>*:last-child]:rounded-r-md hover:cursor-pointer select-none mx-auto font-mono relative overflow-hidden"
      v-if="pageConfim()"
      :class="[displayClass, borderColor, sizeClass]"
    >
      <!-- last -->
      <div
        class="flex h-full aspect-square"
        :class="[ifMin ? 'pointer-events-none' : '', bgColor]"
        @click="changePage(Math.max(1, currentPage - 1))"
        v-if="shouldRenderIcons"
      >
        <ArrowLeftIcon class="m-auto w-3 h-3" :class="textColor" />
      </div>

      <!-- middle -->
      <div
        v-for="(item, index) in list"
        @click="changePage(item.page)"
        :key="index"
        class="flex h-full aspect-square"
        :class="[item.page == currentPage ? activeBgColor : '', bgColor]"
      >
        <span class="m-auto" :class="textColor"> {{ item.value }}</span>
      </div>

      <!-- next -->
      <div
        class="flex h-full aspect-square"
        :class="[ifMax ? 'pointer-events-none' : '', bgColor]"
        @click="changePage(Math.min(pages, currentPage + 1))"
        v-if="shouldRenderIcons"
      >
        <ArrowRightIcon class="m-auto h-3 w-3" :class="textColor" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/vue/24/outline'
import type { PagingProps, PagingItem } from './types'
import { formatUrl } from '../../utils/format.ts'
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'

const props = withDefaults(defineProps<PagingProps>(), {
  pages: 1,
  size: 'md',
  color: 'base',
  hideOnSinglePage: false,
  offset: 1,
  icon: true,
  hideIconOnSm: true,
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
  (e: 'change', page: number): void
}>()

const currentPage = defineModel<number>('currentPage', {
  default: 1,
})

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
  const start = Math.max(2, currentPage.value - offsetValue.value)
  const end = Math.min(props.pages - 1, currentPage.value + offsetValue.value)

  // 前省略号跳转
  if (start > 2) {
    const jumpTarget = Math.max(1, currentPage.value - offsetValue.value - 1)
    result.push({ value: '...', page: jumpTarget })
  }

  // 添加中间页码
  for (let i = start; i <= end; i++) {
    result.push({ value: i, page: i })
  }

  // 后省略号跳转
  if (end < props.pages - 1) {
    const jumpTarget = Math.min(props.pages, currentPage.value + offsetValue.value + 1)
    result.push({ value: '...', page: jumpTarget })
  }

  // 添加最后一页
  result.push({ value: props.pages, page: props.pages })

  return result
}

watch([() => currentPage.value, () => props.offset, () => props.pages], () => {
  list.value = initList()
})

list.value = initList()

const sizeClass = computed(() => {
  switch (props.size) {
    case 'xs':
      return 'h-6'
    case 'sm':
      return 'h-7'
    case 'md':
      return 'h-8'
    case 'lg':
      return 'h-9'
    case 'xl':
      return 'h-10'
  }
})

const bgColor = computed(() => {
  switch (props.color) {
    case 'base':
      return 'bg-base-200'
    case 'neutral':
      return 'bg-neutral/25'
    case 'primary':
      return 'bg-primary/25'
    case 'secondary':
      return 'bg-secondary/25'
    case 'accent':
      return 'bg-accent/25'
    case 'info':
      return 'bg-info/25'
    case 'success':
      return 'bg-success/25'
    case 'warning':
      return 'bg-warning/25'
    case 'error':
      return 'bg-error/25'
    default:
      return 'bg-base-200'
  }
})

const activeBgColor = computed(() => {
  switch (props.color) {
    case 'base':
      return 'bg-base-300'
    case 'neutral':
      return 'bg-neutral/35'
    case 'primary':
      return 'bg-primary/35'
    case 'secondary':
      return 'bg-secondary/35'
    case 'accent':
      return 'bg-accent/35'
    case 'info':
      return 'bg-info/35'
    case 'success':
      return 'bg-success/35'
    case 'warning':
      return 'bg-warning/35'
    case 'error':
      return 'bg-error/35'
    default:
      return 'bg-base-300'
  }
})

const borderColor = computed(() => {
  switch (props.color) {
    case 'base':
      return '*:border-base-content/10'
    case 'neutral':
      return '*:border-neutral/10'
    case 'primary':
      return '*:border-primary/10'
    case 'secondary':
      return '*:border-secondary/10'
    case 'accent':
      return '*:border-accent/10'
    case 'info':
      return '*:border-info/10'
    case 'success':
      return '*:border-success/10'
    case 'warning':
      return '*:border-warning/10'
    case 'error':
      return '*:border-error/10'
    default:
      return '*:border-base-content/10'
  }
})

const textColor = computed(() => {
  switch (props.color) {
    case 'base':
      return 'text-base-content'
    case 'neutral':
      return 'text-neutral'
    case 'primary':
      return 'text-primary'
    case 'secondary':
      return 'text-secondary'
    case 'accent':
      return 'text-accent'
    case 'info':
      return 'text-info'
    case 'success':
      return 'text-success'
    case 'warning':
      return 'text-warning'
    case 'error':
      return 'text-error'
    default:
      return 'text-base-content'
  }
})

const ifMin = computed(() => {
  return currentPage.value === 1 ? true : false
})

const ifMax = computed(() => {
  return currentPage.value === props.pages ? true : false
})

const displayClass = computed(() => {
  if (props.hideOnSinglePage && props.pages === 1) {
    return 'hidden'
  } else {
    return ''
  }
})

const changePage = (page: number) => {
  emit('change', page)
  currentPage.value = page
}

const isSmallScreen = ref(false) // 初始值可以根据需要设置，或在 onMounted 中立即检查
let mediaQueryList: MediaQueryList | null = null
const mediaQueryString = '(max-width: 639px)' // Tailwind md 断点 - 1px

const handleResize = (event: MediaQueryListEvent | MediaQueryList) => {
  isSmallScreen.value = event.matches
}

onMounted(() => {
  // 确保在浏览器环境中执行
  if (typeof window !== 'undefined') {
    mediaQueryList = window.matchMedia(mediaQueryString)
    handleResize(mediaQueryList) // 立即检查一次初始状态
    mediaQueryList.addEventListener('change', handleResize)
  }
})

onUnmounted(() => {
  if (mediaQueryList) {
    mediaQueryList.removeEventListener('change', handleResize)
  }
})

// 计算是否应该渲染图标
const shouldRenderIcons = computed(() => {
  // 如果 props.icon 为 false，则始终不渲染
  if (!props.icon) {
    return false
  }
  // 如果 props.hideIconOnSm 为 false，则始终渲染 (只要 icon 为 true)
  if (!props.hideIconOnSm) {
    return true
  }
  // 如果 hideIconOnSm 为 true，则仅在非小屏幕时渲染
  return !isSmallScreen.value
})
</script>
