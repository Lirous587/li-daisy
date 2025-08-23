<template>
  <div class="p-4">
    <Table :data="data">
      <TableColumn prop="id" label="ID" />
      <TableColumn prop="name" label="编程语言" />
      <TableColumn prop="score" label="得分" />
      <TableColumn label="操作">
        <template #default="{ row, index }: TableColumnDefaultScope<Language>">
          <div class="flex gap-x-3">
            <div class="btn btn-xs btn-success btn-outline" @click="handleToatRow(row)">toast</div>
            <Popconfirm @confirm="handleDeleteRow(index)">
              <template #trigger>
                <div class="btn btn-xs btn-success btn-outline">删除</div>
              </template>
            </Popconfirm>
          </div>
        </template>
      </TableColumn>
    </Table>
  </div>
</template>

<script setup lang="ts">
import { Table, TableColumn, Toast, type TableColumnDefaultScope, Popconfirm } from 'li-daisy'

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
    Toast.warn({
      title: '当前禁止删除',
      message: '至少保留一条数据',
    })
    return
  }
  data.value.splice(index, 1)
  console.log(index)
}

const handleToatRow = (item: Language) => {
  Toast.info({
    title: '当前数据',
    message: `${item.name}:${item.score}`,
  })
}
</script>
