<template>
  <Popover
    ref="popoverRef"
    :position="props.position"
    :z-index="props.zIndex"
    :close-on-click-outside="props.closeOnClickOutside"
    :close-on-escape="props.closeOnEscape"
    trigger="click"
    :duration="props.duration"
    :offset="props.offset"
  >
    <template #trigger>
      <slot name="trigger"></slot>
    </template>
    <template #content>
      <div
        class="flex flex-col gap-y-1 px-2 py-2.5 bg-base-100 rounded-md border border-base-300 shadow-lg"
        :style="{ width: popWidth + 'px' }"
      >
        <slot name="title"></slot>
        <div v-if="!hasTitleSlot" class="text-sm font-semibold">{{ props.title }}</div>

        <slot name="action" :on-confirm="emitConfirm" :on-cancle="emitCancle"></slot>
        <div v-if="!hasActionSlot" class="flex items-center ml-auto gap-x-2 font-extrabold text-xs">
          <button
            class="li-btn li-btn-primary"
            :class="btnSizeClass"
            type="button"
            @click="emitConfirm"
          >
            {{ props.confirmText }}
          </button>
          <button
            class="li-btn li-btn-warning"
            :class="btnSizeClass"
            type="button"
            @click="emitCancle"
          >
            {{ props.cancleText }}
          </button>
        </div>
      </div>
    </template>
  </Popover>
</template>

<script setup lang="ts">
import { computed, ref, useSlots, type Slots } from 'vue'
import { Popover } from '../../Popover'
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
  duration: 250,
  offset: 6,
  btnSize: 'xs',
})

const popoverRef = ref<PopoverRef>()

const popWidth = computed(() => {
  return props.width > 150 ? props.width : 150
})

const btnSizeClass = computed(() => {
  switch (props.btnSize) {
    case 'xs':
      return 'li-btn-xs'
    case 'sm':
      return 'li-btn-sm'
    case 'md':
      return 'li-btn-md'
    case 'lg':
      return 'li-btn-lg'
    case 'xl':
      return 'li-btn-xl'
    default:
      return 'li-btn-xs'
  }
})

const slots: Slots = useSlots()
const hasTitleSlot = computed(() => !!slots.title)
const hasActionSlot = computed(() => !!slots.action)

const emit = defineEmits<{
  confirm: []
  cancle: []
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
