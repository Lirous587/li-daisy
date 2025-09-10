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
        <button class="li-btn li-btn-sm li-btn-outline li-btn-warning">删除</button>
      </template>
    </Popconfirm>
  </div>
</template>

<script setup lang="ts">
// import { Popconfirm, Notification } from 'li-daisy'
import { Popconfirm, Notification } from '../../../packages'

const handleConfirm = () => {
  Notification.success({
    title: '操作成功',
    message: '成功删除',
  })
}

const handleCancle = () => {
  Notification.info({
    title: '取消操作',
    message: '刚刚点错了',
  })
}
</script>
