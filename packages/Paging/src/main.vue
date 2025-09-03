<template>
  <div>
    <div class="sr-only" v-if="props.hrefGenerator || props.preHref">
      <!-- 明确的上一页链接 (如果不在第一页) -->
      <a v-if="safeCurrentPage > 1" :href="generateSeoHref(safeCurrentPage - 1)">Previous Page</a>
      <!-- 明确的下一页链接 (如果不在最后一页) -->
      <a v-if="safeCurrentPage < pages" :href="generateSeoHref(safeCurrentPage + 1)">Next Page</a>
    </div>

    <div
      class="flex *:border-y *:border-r [&>*:first-child]:border-l [&>*:first-child]:rounded-l-md [&>*:last-child]:rounded-r-md cursor-pointer select-none font-mono relative overflow-hidden"
      v-if="pageConfim()"
      :class="[
        displayClass,
        borderColor,
        sizeClass,
        props.hideIconOnSm
          ? 'max-sm:[&>*:nth-child(2)]:border-l max-sm:[&>*:nth-child(2)]:rounded-l-md max-sm:[&>*:nth-last-child(2)]:rounded-r-md'
          : '',
      ]"
    >
      <!-- last -->
      <div
        class="flex h-full aspect-square"
        :class="[
          ifMin ? 'pointer-events-none' : '',
          bgColor,
          props.hideIconOnSm ? 'max-sm:hidden' : '',
        ]"
        @click="changePage(Math.max(1, safeCurrentPage - 1))"
        v-if="props.icon"
      >
        <ArrowLeftIcon class="m-auto w-3 h-3" :class="textColor" />
      </div>

      <!-- middle -->
      <div
        v-for="(item, index) in list"
        @click="changePage(item.page)"
        :key="index"
        class="flex h-full aspect-square"
        :class="[bgColor, item.page == currentPage ? activeBgColor : '']"
      >
        <span class="m-auto" :class="textColor"> {{ item.value }}</span>
      </div>

      <!-- next -->
      <div
        class="flex h-full aspect-square"
        :class="[
          ifMax ? 'pointer-events-none' : '',
          bgColor,
          props.hideIconOnSm ? 'max-sm:hidden' : '',
        ]"
        @click="changePage(Math.min(pages, safeCurrentPage + 1))"
        v-if="props.icon"
      >
        <ArrowRightIcon class="m-auto h-3 w-3" :class="textColor" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/vue/24/outline'
import type { PagingProps, PagingItem, PagingRef } from './types'
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

const currentPage = defineModel<number | undefined>('modelValue', {
  required: true,
})

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
      return 'bg-neutral/80'
    case 'primary':
      return 'bg-primary/80'
    case 'secondary':
      return 'bg-secondary/80'
    case 'accent':
      return 'bg-accent/80'
    case 'info':
      return 'bg-info/80'
    case 'success':
      return 'bg-success/80'
    case 'warning':
      return 'bg-warning/80'
    case 'error':
      return 'bg-error/80'
  }
})

const activeBgColor = computed(() => {
  switch (props.color) {
    case 'base':
      return '!bg-base-300'
    case 'neutral':
      return '!bg-neutral'
    case 'primary':
      return '!bg-primary'
    case 'secondary':
      return '!bg-secondary'
    case 'accent':
      return '!bg-accent'
    case 'info':
      return '!bg-info'
    case 'success':
      return '!bg-success'
    case 'warning':
      return '!bg-warning'
    case 'error':
      return '!bg-error'
  }
})

const borderColor = computed(() => {
  switch (props.color) {
    case 'base':
      return '*:border-base-content/15'
    case 'neutral':
      return '*:border-neutral-content/15'
    case 'primary':
      return '*:border-primary-content/15'
    case 'secondary':
      return '*:border-secondary-content/15'
    case 'accent':
      return '*:border-accent-content/15'
    case 'info':
      return '*:border-info-content/15'
    case 'success':
      return '*:border-success-content/15'
    case 'warning':
      return '*:border-warning-content/15'
    case 'error':
      return '*:border-error-content/15'
  }
})

const textColor = computed(() => {
  switch (props.color) {
    case 'base':
      return 'text-base-content'
    case 'neutral':
      return 'text-neutral-content'
    case 'primary':
      return 'text-primary-content'
    case 'secondary':
      return 'text-secondary-content'
    case 'accent':
      return 'text-accent-content'
    case 'info':
      return 'text-info-content'
    case 'success':
      return 'text-success-content'
    case 'warning':
      return 'text-warning-content'
    case 'error':
      return 'text-error-content'
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

const exposeObject: PagingRef = {
  change: changePage,
  pages: props.pages,
  currentPage: safeCurrentPage.value,
}

defineExpose(exposeObject)
</script>
