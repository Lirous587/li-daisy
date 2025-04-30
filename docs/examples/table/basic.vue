<template>
  <div class="p-4 space-y-6">
    <Table :data="data" zebra>
      <TableColumn prop="id" label="ID" />
      <TableColumn prop="name" label="姓名" />
      <TableColumn prop="age" label="年龄" />
      <TableColumn label="操作" width="150px">
        <template #default="{ row, index }">
          <div class="font-bold animate-bounce">{{ row.name }} - {{ index }}</div>
        </template>
      </TableColumn>
    </Table>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Table, TableColumn } from '../../../packages'

const data = ref([
  { id: 1, name: '张三', age: 28 },
  { id: 2, name: '李四', age: 35 },
  { id: 3, name: '王五', age: 22 },
  { id: 4, name: '赵六', age: 41 },
  { id: 5, name: '孙七', age: 30 },
])
</script>
