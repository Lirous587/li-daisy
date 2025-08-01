<template>
  <Popover
    ref="popoverRef"
    :position="props.position"
    :z-index="props.zIndex"
    :close-on-click-outside="props.closeOnClickOutside"
    :close-on-escape="props.closeOnEscape"
    trigger="click"
  >
    <template #trigger>
      <slot name="trigger"></slot>
    </template>
    <template #content>
      <div
        class="flex flex-col gap-y-3 p-4 bg-base-100 rounded-md border border-base-300 shadow-lg"
        :style="{ width: popWidth + 'px' }"
      >
        <slot name="title"></slot>
        <slot name="action" :onConfirm="emitConfirm" :onCancle="emitCancle"></slot>
        <div v-if="!hasTitleSlot" class="font-semibold">{{ props.title }}</div>
        <div v-if="!hasActionSlot" class="flex items-center ml-auto gap-x-3 font-extrabold text-xs">
          <button class="btn btn-sm btn-info btn-outline" @click="emitConfirm" type="button">
            {{ props.confirmText }}
          </button>
          <button class="btn btn-sm btn-warning btn-dash" @click="emitCancle" type="button">
            {{ props.cancleText }}
          </button>
        </div>
      </div>
    </template>
  </Popover>
</template>

<script setup lang="ts">
import { computed, ref, useSlots, type Slots } from 'vue'
import Popover from '../../Popover'
import type { PopoverRef } from '../../Popover'
import type { PopconfirmProps } from './types'

const props = withDefaults(defineProps<PopconfirmProps>(), {
  position: 'top',
  closeOnClickOutside: true,
  closeOnEscape: true,
  title: '确定操作？',
  confirmText: '确定',
  cancleText: '取消',
  width: 150,
})

const popoverRef = ref<PopoverRef>()

const popWidth = computed(() => {
  return props.width > 150 ? props.width : 150
})

const slots: Slots = useSlots()
const hasTitleSlot = computed(() => !!slots.title)
const hasActionSlot = computed(() => !!slots.action)

const emit = defineEmits<{
  (e: 'confirm'): void
  (e: 'cancle'): void
}>()

const emitConfirm = () => {
  emit('confirm')
  popoverRef.value?.hide()
}
const emitCancle = () => {
  popoverRef.value?.hide()
  emit('cancle')
}
</script>
