<template>
  <div class="w-full flex flex-col gap-y-4">
    <!-- 示例 1: 使用 pre-href -->
    <p class="text-center text-sm">使用 <code>pre-href="/article/"</code> (当前第 3 页)</p>
    <Paging class="m-auto" :pages="10" :current-page="3" pre-href="/article/"></Paging>
    <p class="text-center text-xs text-base-content/70">
      爬虫现在可以发现指向 <code>/article/2</code> (上一页) 和 <code>/article/4</code> (下一页)
      的链接。
    </p>

    <!-- 示例 2: 使用 href-generator -->
    <p class="text-center text-sm">使用 <code>href-generator</code> (当前第 5 页)</p>
    <Paging class="m-auto" :pages="10" :current-page="5" :href-generator="generateLink"></Paging>
    <p class="text-center text-xs text-base-content/70">
      爬虫现在可以发现指向 <code>/blog/page/4</code> (上一页) 和 <code>/blog/page/6</code> (下一页)
      的链接。
    </p>
  </div>
</template>

<script setup lang="ts">
import { Paging } from 'li-daisy'

// href-generator 函数示例
const generateLink = (page: number) => {
  // 模拟复杂逻辑，例如第一页特殊处理
  if (page === 1) {
    return '/blog'
  }
  // 其他页使用不同路径结构
  return `/blog/page/${page}`
}
</script>
