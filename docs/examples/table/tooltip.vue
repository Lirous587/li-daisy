<template>
  <div class="p-4">
    <Table :data="data">
      <TableColumn prop="id" label="ID" :width="40" />
      <TableColumn prop="name" label="编程语言" :width="100" />
      <TableColumn prop="score" label="得分" />
      <TableColumn prop="description" label="描述" :width="200" tooltip />
    </Table>
  </div>
</template>

<script setup lang="ts">
import { Table, TableColumn } from 'li-daisy'
import { ref } from 'vue'

interface Language {
  id: number
  name: string
  score: number
  description: string
}

const data = ref<Language[]>([
  {
    id: 1,
    name: 'Golang',
    score: 100,
    description: 'Google 开发的静态强类型编译型语言',
  },
  {
    id: 2,
    name: 'TypeScript',
    score: 99,
    description: 'JavaScript 的超集，添加了类型系统',
  },
  {
    id: 3,
    name: 'CSS',
    score: 100,
    description: '层叠样式表，用于描述 HTML 文档的呈现',
  },
  {
    id: 4,
    name: 'JavaScript',
    score: 95,
    description: '广泛用于 Web 开发的脚本语言',
  },
])
</script>
