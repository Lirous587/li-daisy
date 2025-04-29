<template>
  <div class="p-4">
    <Table :data="data" :zebra="true"> </Table>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Table } from '../../../packages'

const data = ref([
  { id: 1, name: '张三', age: 28, city: '北京', job: '工程师' },
  { id: 2, name: '李四', age: 35, city: '上海', job: '设计师' },
  { id: 3, name: '王五', age: 22, city: '广州', job: '产品经理' },
  { id: 4, name: '赵六', age: 41, city: '深圳', job: '测试工程师' },
  { id: 5, name: '孙七', age: 30, city: '杭州', job: '前端开发' },
])
</script>
