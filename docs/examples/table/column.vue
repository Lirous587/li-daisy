<template>
  <div class="p-4">
    <Table :data="data">
      <TableColumn prop="id" label="ID" />
      <TableColumn prop="name" label="编程语言" />
      <TableColumn prop="score" label="得分" />
      <TableColumn label="操作">
        <template #default="{ row, index }: TableColumnDefaultScope<Language>">
          <div class="flex gap-x-3">
            <div class="li-btn li-btn-xs li-btn-success li-btn-outline" @click="handleToatRow(row)">
              toast
            </div>
            <Popconfirm :z-index="10" @confirm="handleDeleteRow(index)">
              <template #trigger>
                <div class="li-btn li-btn-xs li-btn-success li-btn-outline">删除</div>
              </template>
            </Popconfirm>
          </div>
        </template>
      </TableColumn>
    </Table>
  </div>
</template>

<script setup lang="ts">
import {
  Table,
  TableColumn,
  Notification,
  type TableColumnDefaultScope,
  Popconfirm,
} from 'li-daisy'

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
  if (data.value.length === 0) {
    Notification.warning({
      title: '删除失败',
      message: '当前已无数据',
    })
    return
  }
  data.value.splice(index, 1)
}

const handleToatRow = (item: Language) => {
  Notification.info({
    title: '当前数据',
    message: `${item.name}:${item.score}`,
  })
}
</script>
