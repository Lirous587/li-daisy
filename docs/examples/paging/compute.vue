<template>
  <!-- 示例1: 基础用法 - 直接指定总页数 -->
  <div class="space-y-4">
    <h3 class="text-lg font-bold">1. 基础用法 (pages)</h3>
    <div class="flex items-center gap-4">
      <Paging v-model="currentPage1" :pages="totalPages1" />
    </div>
  </div>

  <!-- 示例2: 计算总页数 - 使用 total 和 page-size -->
  <div class="space-y-4">
    <h3 class="text-lg font-bold">2. 计算总页数 (total & page-size)</h3>
    <div class="flex items-center gap-4">
      <Paging v-model="currentPage2" :total="totalItems" :page-size="itemsPerPage" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Paging } from 'li-daisy'

// 示例1: 使用 pages 属性
const currentPage1 = ref(5)
const totalPages1 = 10

// 示例2: 使用 total 和 perPage 计算
const currentPage2 = ref(5)
const totalItems = ref(100)
const itemsPerPage = ref(10)
</script>
