<template>
  <div class="flex flex-col gap-4 items-center">
    <Popconfirm
      title="这将是一个危险操作，确定继续？"
      :width="200"
      confirm-text="确定"
      cancle-text="取消"
      @confirm="handleConfirm"
      @cancle="handleCancle"
    >
      <template #trigger>
        <button class="btn btn-sm btn-outline btn-warning">删除</button>
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
    message: '刚刚点错了',
  })
}
</script>
