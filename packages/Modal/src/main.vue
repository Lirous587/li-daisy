<template>
  <dialog ref="dialogRef" class="modal" :class="directionClass">
    <div class="modal-box" :class="props.size">
      <div v-if="hasHeaderSlot" class="top-2 left-2 right-2 h-fit">
        <slot name="header" :close="close"></slot>
      </div>
      <div v-else>
        <div v-if="showCloseIcon" class="absolute right-3 top-2" @click="close">✕</div>
      </div>

      <div class="mt-2">
        <slot name="body"></slot>
      </div>
    </div>

    <!-- 蒙层 -->
    <form
      v-if="props.closeOnClickModal"
      method="dialog"
      class="modal-backdrop"
      @click="close"
    ></form>
  </dialog>
</template>

<script lang="ts" setup>
import type { ModalProps, ModalRef } from './types'
import { computed, ref, useSlots } from 'vue'

const props = withDefaults(defineProps<ModalProps>(), {
  showCloseIcon: true,
  closeOnClickModal: true,
})

const emit = defineEmits<{
  (e: 'open'): void
  (e: 'close'): void
}>()

const dialogRef = ref<HTMLDialogElement>()

const slots = useSlots()

const hasHeaderSlot = computed(() => slots.header)

const showCloseIcon = computed(() => {
  if (!props.closeOnClickModal) {
    return true
  } else {
    return props.showCloseIcon
  }
})

const directionClass = computed(() => {
  switch (props.direction) {
    case 'ltr':
      return 'modal-start'
    case 'rtl':
      return 'modal-end'
    case 'ttb':
      return 'modal-top !w-screen'
    case 'middle':
      return 'modal-middle'
    case 'btt':
      return 'modal-bottom !w-screen'
    default:
      return 'modal-middle'
  }
})

const open = () => {
  dialogRef.value?.showModal()
  emit('open')
}

const close = () => {
  dialogRef.value?.close()
  emit('close')
}

const exposeObject: ModalRef = {
  open,
  close,
}

defineExpose(exposeObject)
</script>
