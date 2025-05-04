<template>
  <div class="p-4">
    <Table :data="data">
      <TableColumn prop="id" label="ID" />
      <TableColumn prop="name" label="编程语言" />
      <TableColumn prop="score" label="得分" />
      <TableColumn label="操作">
        <template #default="{ row, index }">
          <div class="flex gap-x-3">
            <div class="btn btn-xs btn-success btn-outline" @click="handleToatRow(row as Language)">
              toast
            </div>
            <div class="btn btn-xs btn-success btn-outline" @click="handleDeleteRow(index)">
              删除
            </div>
          </div>
        </template>
      </TableColumn>
    </Table>
  </div>
</template>

<script setup lang="ts">
import { Table, TableColumn, toast } from 'li-daisy'
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

const handleDeleteRow = (index: number) => {
  if (data.value.length === 1) {
    toast.warning('至少保留一条数据')
    return
  }
  data.value.splice(index, 1)
}

const handleToatRow = (item: Language) => {
  toast.info(`${item.name}`)
}
</script>
