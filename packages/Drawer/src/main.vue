<template>
  <div class="li-drawer" :class="drawerDirection">
    <input
      :id="uniqueID"
      ref="drawerToggleRef"
      v-model="status"
      type="checkbox"
      class="li-drawer-toggle"
    />
    <!-- trigger -->
    <div class="li-drawer-content">
      <label :for="uniqueID">
        <slot name="trigger" />
      </label>
    </div>

    <div class="li-drawer-side z-[100]">
      <!-- 蒙层 -->
      <label
        :for="uniqueID"
        aria-label="close sidebar"
        class="li-drawer-overlay"
        :class="closeOnClickModal ? '' : 'pointer-events-none'"
      ></label>

      <!-- drawer内容 -->
      <div class="!bg-base-100 h-full flex flex-col" :class="props.size">
        <!-- default-header -->
        <div
          v-if="!hasHeaderSlot"
          class="li-drawer-header-default pt-2 px-4 w-full flex items-center justify-between flex-nowrap"
        >
          <div class="li-drawer-title text-lg">
            {{ props.title }}
          </div>
          <XMarkIcon
            v-if="showCloseIcon"
            class="li-drawer-icon w-6 h-6 cursor-pointer"
            @click="close"
          />
        </div>

        <!-- custom-header -->
        <div v-else class="li-drawer-header">
          <slot name="header" :close="close"></slot>
        </div>

        <!-- body -->
        <div class="li-drawer-body mt-3 px-4 flex-1 overflow-auto !no-scrollbar">
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
      return 'li-drawer-start'
    case 'rtl':
      return 'li-drawer-end'
    default:
      return 'li-drawer-start'
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

const emit = defineEmits<{
  open: []
  close: []
}>()

const open = () => {
  status.value = true
}
const close = () => {
  status.value = false
}

watch(status, newStatus => {
  if (newStatus) {
    emit('open')
  } else {
    emit('close')
  }
})

const exposeObject: DrawerRef = {
  open,
  close,
  get status() {
    return status.value
  },
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
