<template>
  <div>
    <DrawerConfirm
      ref="drawerConfirmRef"
      title="抽屉标题"
      direction="ltr"
      :form="form"
      @submit="handleSubmit"
    >
      <p class="font-bold">这是抽屉内容</p>
    </DrawerConfirm>
    <div class="btn btn-primary" @click="handleOpenDrawer">打开抽屉</div>
  </div>
</template>

<script setup lang="ts">
import { DrawerConfirm } from 'li-daisy'
import type { DrawerConfirmRef } from 'li-daisy'
import { reactive, ref } from 'vue'

const drawerConfirmRef = ref<DrawerConfirmRef>()

const form = reactive({
  username: '',
  password: '',
})

const handleOpenDrawer = () => {
  drawerConfirmRef.value?.open()
}

const handleSubmit = () => {
  console.log('提交成功')
}
</script>
