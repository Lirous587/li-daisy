<template>
  <div class="flex flex-col gap-4 items-center">
    <Popconfirm @confirm="handleConfirm" @cancle="handleCancle" :width="200" position="bottom">
      <template #trigger>
        <button class="btn btn-sm btn-outline btn-warning">自定义</button>
      </template>
      <template #title>
        <p class="font-serif">Are you sure to delete?</p>
      </template>
      <template #action="{ onConfirm, onCancle }">
        <div class="flex items-center justify-end gap-x-5">
          <button class="btn btn-primary btn-sm btn-dash btn-circle" @click="onConfirm">√</button>
          <button class="btn btn-secondary btn-sm btn-dash btn-circle" @click="onCancle">×</button>
        </div>
      </template>
    </Popconfirm>
  </div>
</template>

<script setup lang="ts">
import { Popconfirm, Toast } from 'li-daisy'

const handleConfirm = () => {
  Toast.success({
    title: '操作成功',
    message: '成功删除',
  })
}

const handleCancle = () => {
  Toast.info({
    title: '取消操作',
    message: '刚刚手滑了',
  })
}
</script>
