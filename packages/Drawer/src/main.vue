<template>
  <div class="drawer" :class="drawerDirection">
    <input
      :id="uniqueID"
      ref="drawerToggleRef"
      v-model="status"
      type="checkbox"
      class="drawer-toggle"
    />
    <div class="drawer-content">
      <!-- Page content here  -->
      <label :for="uniqueID">
        <!-- 这里不再对外暴露 避免发生一些掌控之外的操作
          统一改为调用expose方法 通过组件实例去手动调用-->
        <!-- <slot /> -->
      </label>
    </div>

    <div class="drawer-side z-[100]">
      <!-- 蒙层 -->
      <label
        :for="uniqueID"
        aria-label="close sidebar"
        class="drawer-overlay"
        :class="closeOnClickModal ? '' : 'pointer-events-none'"
      ></label>
      <div class="bg-base-200 text-base-content min-h-full p-4 flex flex-col" :class="props.size">
        <div class="w-full flex items-center justify-between flex-nowrap overflow-auto">
          <div class="text-lg font-bold text-base-content">
            {{ props.title }}
          </div>
          <XMarkIcon class="w-6 h-6 cursor-pointer" v-if="showCloseIcon" @click="close" />
        </div>
        <div class="mt-3 flex-1">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { DrawerRef, DrawerProps } from './types'
import { XMarkIcon } from '@heroicons/vue/24/outline'
import { getUniqueID } from '../../utils/random'
import { computed, ref, watch } from 'vue'

const props = withDefaults(defineProps<DrawerProps>(), {
  direction: 'ltr',
  size: 'w-[40vw] min-w-[250px]',
  closeOnClickModal: true,
  closeIcon: false,
})

const status = ref(false)
const drawerToggleRef = ref<HTMLInputElement | null>(null)

// 生成唯一 ID
const uniqueID = getUniqueID()

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
    return props.closeIcon
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

const exposeObject: DrawerRef = {
  open,
  close,
  status,
}

defineExpose(exposeObject)
</script>
