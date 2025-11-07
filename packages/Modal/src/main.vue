<template>
  <CompatiblePortal to="body">
    <dialog ref="dialogRef" class="li-modal" :class="directionClass">
      <div class="li-modal-box p-0" :class="[props.size]">
        <div v-if="hasHeaderSlot" class="li-modal-header">
          <slot name="header" :close="close"></slot>
        </div>
        <div
          v-else-if="showCloseIcon"
          class="li-modal-header-default absolute right-3 top-2"
          @click="close"
        >
          <XMarkIcon class="w-5 h-5 text-base-content cursor-pointer opacity-70" />
        </div>

        <div class="mt-2 p-4 li-modal-body">
          <slot name="body"></slot>
        </div>
      </div>

      <!-- 蒙层 -->
      <form
        v-if="props.closeOnClickModal"
        method="dialog"
        class="li-modal-backdrop"
        @click="close"
      ></form>
    </dialog>
  </CompatiblePortal>
</template>

<script lang="ts" setup>
import { XMarkIcon } from '@heroicons/vue/24/outline'
import type { ModalProps, ModalRef } from './types'
import { computed, ref, useSlots } from 'vue'
import CompatiblePortal from '../../ssr/CompatiblePortal.vue'

const props = withDefaults(defineProps<ModalProps>(), {
  showCloseIcon: true,
  closeOnClickModal: true,
})

const emit = defineEmits<{
  open: []
  close: []
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
      return 'li-modal-start'
    case 'rtl':
      return 'li-modal-end'
    case 'ttb':
      return 'li-modal-top !w-screen'
    case 'middle':
      return 'li-modal-middle'
    case 'btt':
      return 'li-modal-bottom !w-screen'
    default:
      return 'li-modal-middle'
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
