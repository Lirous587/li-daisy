<template>
  <div class="p-4 space-y-6">
    <Table class="h-[260px]" :data="data">
      <TableColumn prop="id" label="ID" width="50px" header-align="center" align="center" />
      <TableColumn prop="name" label="编程语言" header-align="center" align="center" />
      <TableColumn prop="score" label="得分" header-align="center" align="center" />
    </Table>
  </div>
</template>

<script setup lang="ts">
import { Table, TableColumn } from '../../../packages'
import { ref } from 'vue'

interface Language {
  id: number
  name: string
  score: number
}

const data = ref<Language[]>([
  { id: 1, name: 'Golang', score: 100 },
  { id: 2, name: 'TypeScript', score: 99 },
  { id: 3, name: 'CSS', score: 100 },
  { id: 4, name: 'JavaScript', score: 95 },
  { id: 5, name: 'Python', score: 98 },
  { id: 6, name: 'Java', score: 92 },
  { id: 7, name: 'C#', score: 90 },
  { id: 8, name: 'Rust', score: 96 },
  { id: 9, name: 'PHP', score: 85 },
  { id: 10, name: 'Swift', score: 93 },
  { id: 11, name: 'Kotlin', score: 94 },
  { id: 12, name: 'Ruby', score: 88 },
])
</script>
