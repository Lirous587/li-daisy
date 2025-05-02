<template>
  <div class="p-4 space-y-6">
    <div class="overflow-x-auto">
      <Table :data="data" select>
        <TableColumn prop="id" label="ID" width="50px" pin-col="left" />
        <TableColumn prop="name" label="编程语言" width="150px" pin-col="left" />
        <TableColumn prop="score" label="得分" width="150px" />
        <TableColumn prop="description" label="描述" width="300px" />
        <TableColumn prop="description" label="描述" width="300px" />
        <TableColumn prop="description" label="描述" width="300px" />

        <TableColumn prop="popularity" label="流行度" width="300px" />
        <TableColumn prop="creator" label="创建者" width="300px" />
        <TableColumn prop="year" label="诞生年份" width="300px" pin-col="right" />
        <TableColumn prop="type" label="类型" width="200px" pin-col="right" />
      </Table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Table, TableColumn } from '../../../packages'
import { ref } from 'vue'

interface Language {
  id: number
  name: string
  score: number
  description: string
  popularity: number
  creator: string
  year: number
  type: string
}

const data = ref<Language[]>([
  {
    id: 1,
    name: 'Golang',
    score: 100,
    description: 'Google 开发的静态强类型编译型语言',
    popularity: 8,
    creator: 'Google',
    year: 2009,
    type: '编译型',
  },
  {
    id: 2,
    name: 'TypeScript',
    score: 99,
    description: 'JavaScript 的超集，添加了类型系统',
    popularity: 9,
    creator: 'Microsoft',
    year: 2012,
    type: '编译型 (转译)',
  },
  {
    id: 3,
    name: 'CSS',
    score: 100,
    description: '层叠样式表，用于描述 HTML 文档的呈现',
    popularity: 10,
    creator: 'W3C',
    year: 1996,
    type: '样式表',
  },
  {
    id: 4,
    name: 'JavaScript',
    score: 95,
    description: '广泛用于 Web 开发的脚本语言',
    popularity: 10,
    creator: 'Brendan Eich',
    year: 1995,
    type: '解释型',
  },
  {
    id: 5,
    name: 'Python',
    score: 98,
    description: '通用高级编程语言',
    popularity: 10,
    creator: 'Guido van Rossum',
    year: 1991,
    type: '解释型',
  },
  {
    id: 6,
    name: 'Java',
    score: 92,
    description: '面向对象的编程语言',
    popularity: 9,
    creator: 'Sun Microsystems',
    year: 1995,
    type: '编译型 (到字节码)',
  },
  {
    id: 7,
    name: 'Rust',
    score: 96,
    description: '注重安全和并发的系统编程语言',
    popularity: 7,
    creator: 'Mozilla Research',
    year: 2010,
    type: '编译型',
  },
  {
    id: 8,
    name: 'PHP',
    score: 85,
    description: '广泛用于 Web 开发的服务器端脚本语言',
    popularity: 8,
    creator: 'Rasmus Lerdorf',
    year: 1994,
    type: '解释型',
  },
])
</script>
