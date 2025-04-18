<template>
  <div class="drawer" :class="drawerDirection">
    <input
      :id="drawerId"
      ref="drawerToggleRef"
      v-model="status"
      type="checkbox"
      class="drawer-toggle"
    />
    <div class="drawer-content">
      <!-- Page content here  -->
      <label :for="drawerId">
        <!-- 这里不再对外暴露 避免发生一些掌控之外的操作
          统一改为调用expose方法 通过组件实例去手动调用-->
        <!-- <slot /> -->
      </label>
    </div>

    <div class="drawer-side z-[100]">
      <!-- 蒙层 -->
      <label
        :for="drawerId"
        aria-label="close sidebar"
        class="drawer-overlay"
        :class="closeOnClickModal ? '' : 'pointer-events-none'"
      ></label>
      <div
        class="bg-base-200 text-base-content min-h-full p-4 flex flex-col"
        :style="{ width: props.size }"
      >
        <div class="flex items-center justify-between w-full flex-nowrap overflow-auto">
          <div class="text-lg font-bold text-base-content">
            {{ props.title }}
          </div>
          <Close class="w-6 h-6 cursor-pointer" v-if="showCloseIcon" @click="close" />
        </div>
        <div class="mt-3 flex-1">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import type { DrawerRef, DrawerProps } from './types'
import { useRoute } from 'vue-router'

import Close from '../../icon/Close.vue'

const props = withDefaults(defineProps<DrawerProps>(), {
  direction: 'ltr',
  size: 'max(300px, 40%)',
  closeOnClickModal: true,
  showCloseIcon: false,
})

const route = useRoute()

const status = ref(false)
const drawerToggleRef = ref<HTMLInputElement | null>(null)

// 生成唯一 ID
const uniqueId = Date.now().toString(36) + Math.random().toString(36).substring(2)
const drawerId = computed(() => `drawer-${uniqueId}`)

const drawerDirection = computed(() => {
  switch (props.direction) {
    case 'ltr':
      return 'drawer-start'
    case 'rtl':
      return 'drawer-end'
    default:
      return 'drawer-start'
  }
})

const showCloseIcon = computed(() => {
  if (!props.closeOnClickModal) {
    return true
  } else {
    return props.showCloseIcon
  }
})

const emit = defineEmits(['open', 'close'])

const open = () => {
  status.value = true
}
const close = () => {
  status.value = false
}

watch(status, (newStatus) => {
  if (newStatus) {
    emit('open')
  } else {
    emit('close')
  }
})

watch(route, () => {
  close()
})

const exposeObject: DrawerRef = {
  open,
  close,
}

defineExpose(exposeObject)
</script>
