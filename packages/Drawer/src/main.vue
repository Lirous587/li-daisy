<template>
  <div class="drawer" :class="drawerDirection">
    <input
      :id="uniqueID"
      ref="drawerToggleRef"
      v-model="status"
      type="checkbox"
      class="drawer-toggle"
    />
    <!-- trigger -->
    <div class="drawer-content">
      <label :for="uniqueID">
        <slot name="trigger" />
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

      <!-- drawer内容 -->
      <div class="bg-base-100 h-full p-4 flex flex-col" :class="props.size">
        <!-- default-header -->
        <div v-if="!hasHeaderSlot" class="w-full flex items-center justify-between flex-nowrap">
          <div class="li-drawer-title text-lg">
            {{ props.title }}
          </div>
          <XMarkIcon
            class="li-drawer-icon w-6 h-6 cursor-pointer"
            v-if="showCloseIcon"
            @click="close"
          />
        </div>

        <!-- custom-header -->
        <div v-else>
          <slot name="header" :close="close"></slot>
        </div>

        <!-- body -->
        <div class="mt-3 flex-1 overflow-auto !no-scrollbar">
          <slot name="body" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { DrawerRef, DrawerProps } from './types'
import { XMarkIcon } from '@heroicons/vue/24/outline'
import { computed, ref, watch, useId, useSlots } from 'vue'

const props = withDefaults(defineProps<DrawerProps>(), {
  direction: 'ltr',
  size: 'w-[40vw] min-w-[250px]',
  closeOnClickModal: true,
  showCloseIcon: true,
})

const status = ref(false)
const drawerToggleRef = ref<HTMLInputElement | null>(null)

// 生成唯一 ID
const uniqueID = useId()

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

const hasHeaderSlot = computed(() => !!useSlots().header)

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

<style scoped>
.li-drawer-title,
.li-drawer-icon {
  color: color-mix(in oklab, var(--color-base-100) 20%, var(--color-base-content) 80%);
}
.li-drawer-title {
  font-weight: 700;
}
</style>
