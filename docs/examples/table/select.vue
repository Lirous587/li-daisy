<template>
  <div class="p-4">
    <Table :data="data" select :selectable="selectable" @select-change="handleSelectChange">
      <TableColumn prop="id" label="ID" />
      <TableColumn prop="name" label="编程语言" />
      <TableColumn prop="score" label="得分" />
    </Table>

    <p class="mt-2 text-sm opacity-60 font-bold">当前选择列</p>
    <ul class="list">
      <li v-for="row in selectRows" :key="row.id" class="list-row">
        <span>{{ row.id }} - {{ row.name }} - {{ row.score }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { Table, TableColumn } from 'li-daisy'

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
])

// 过滤逻辑
const selectable = (lang: Language): boolean => lang.score > 98

const selectRows = ref<Language[]>()

const handleSelectChange = (rows: Language[]) => {
  selectRows.value = rows
}
</script>
