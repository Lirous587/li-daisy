<template>
  <div class="p-4 space-y-6">
    <Table :data="data" select>
      <TableColumn prop="id" label="ID" pin-col="left" />
      <TableColumn prop="name" label="编程语言" />
      <TableColumn prop="score" label="得分" />
      <TableColumn prop="description" label="描述" :width="300" />
      <TableColumn label="操作" pin-col="right">
        <template #default="{ row, index }">
          <div class="flex gap-x-3">
            <div class="btn btn-xs btn-success btn-outline" @click="handleToatRow(row)">toast</div>
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
