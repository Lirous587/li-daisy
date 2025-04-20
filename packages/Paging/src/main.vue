<template>
  <div>
    <div>
      <div class="sr-only" v-if="props.hrefGenerator || props.preHref">
        <!-- 明确的上一页链接 (如果不在第一页) -->
        <a v-if="currentPage > 1" :href="generateSeoHref(currentPage - 1)">Previous Page</a>
        <!-- 明确的下一页链接 (如果不在最后一页) -->
        <a v-if="currentPage < pages" :href="generateSeoHref(currentPage + 1)">Next Page</a>
      </div>
    </div>
    <div class="join select-none mx-auto font-mono" v-if="pageConfim()" :class="displayClass">
      <!-- last -->
      <div
        class="join-item btn btn-sm btn-soft hidden md:flex"
        :class="ifMin ? 'pointer-events-none' : ''"
        @click="changePage(Math.max(1, currentPage - 1))"
        v-if="props.showIcon"
      >
        <ArrowLeft class="m-auto w-3 h-3 text-base-content/80" />
      </div>

      <!-- middle -->
      <div
        v-for="(item, index) in list"
        @click="changePage(item.page)"
        :key="index"
        class="join-item btn btn-sm btn-soft"
        :class="{
          'pointer-events-none btn-active': item.page == currentPage,
        }"
      >
        <span class="text-base-content/80"> {{ item.value }}</span>
      </div>

      <!-- next -->
      <div
        class="join-item btn btn-sm btn-soft hidden md:flex"
        :class="ifMax ? 'pointer-events-none' : ''"
        @click="changePage(Math.min(pages, currentPage + 1))"
        v-if="props.showIcon"
      >
        <ArrowRight class="m-auto h-3 w-3 text-base-content/80" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ArrowLeft from '../../icon/ArrowLeft.vue'
import ArrowRight from '../../icon/ArrowRight.vue'
import type { PagingProps, PagingItem } from './types'
import { formatUrl } from '../../utils/format.ts'
import { computed, ref, watch } from 'vue'

const props = withDefaults(defineProps<PagingProps>(), {
  pages: 1,
  hideOnSinglePage: false,
  offset: 1,
  showIcon: true,
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
</script>
