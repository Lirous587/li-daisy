<template>
  <div class="p-4">
    <Table :data="data">
      <TableColumn prop="id" label="ID">
        <template #header="{ label, prop }">
          <span class="font-bold text-info">{{ label }} - {{ prop }}</span>
        </template>
      </TableColumn>
      <TableColumn prop="name" label="编程语言" />
      <TableColumn prop="score" label="得分" />
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
}

const data = ref<Language[]>([
  { id: 1, name: 'Golang', score: 100 },
  { id: 2, name: 'TypeScript', score: 99 },
  { id: 3, name: 'CSS', score: 100 },
  { id: 4, name: 'JavaScript', score: 95 },
])
</script>
