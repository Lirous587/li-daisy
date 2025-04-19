<template>
  <dialog ref="dialogRef" class="modal" :class="directionClass">
    <div class="modal-box" :class="props.size">
      <slot></slot>
      <div class="modal-action">
        <form v-if="showCloseIcon" method="dialog">
          <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>
      </div>
    </div>

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
import { computed, ref } from 'vue'

const props = withDefaults(defineProps<ModalProps>(), {
  showCloseIcon: false,
  closeOnClickModal: true,
})

const dialogRef = ref<HTMLDialogElement>()

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
      return 'modal-top'
    case 'btt':
      return 'modal-bottom'
    default:
      return 'modal-middle'
  }
})

const open = () => {
  dialogRef.value?.showModal()
}

const close = () => {
  dialogRef.value?.close()
}

const exposeObject: ModalRef = {
  open,
  close,
}

defineExpose(exposeObject)
</script>
