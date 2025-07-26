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
        <div class="flex items-center gap-x-5">
          <button class="btn btn-success btn-sm btn-dash" @click="onConfirm">对！</button>
          <button class="btn btn-accent btn-sm font-mono" @click="onCancle">点错啦！</button>
        </div>
      </template>
    </Popconfirm>
  </div>
</template>

<script setup lang="ts">
import { Popconfirm, toast } from 'li-daisy'

const handleConfirm = () => {
  toast.success('你点了对')
}

const handleCancle = () => {
  toast.info('刚刚手滑了')
}
</script>
