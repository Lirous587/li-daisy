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
        <!-- <slot /> -->
      </label>
    </div>

    <div class="drawer-side z-[100]">
      <!-- 蒙层 -->
      <label
        :for="uniqueID"
        aria-label="close sidebar"
        class="drawer-overlay pointer-events-none"
      ></label>
      <div class="bg-base-200 text-base-content min-h-full p-4 flex flex-col" :class="props.size">
        <div class="w-full flex items-center justify-between flex-nowrap overflow-auto">
          <div class="text-lg font-bold text-base-content">
            {{ props.title }}
          </div>
          <Close class="w-6 h-6 cursor-pointer" @click="close" />
        </div>
        <div class="mt-3 flex-1">
          <slot />
        </div>

        <div class="ml-auto mr-4 space-x-4">
          <button class="btn btn-primary btn-outline btn-sm" @click="submit">
            {{ confirmText }}
          </button>
          <button class="btn btn-neutral btn-outline btn-sm" @click="close">
            {{ cancelText }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { DrawerRef, DrawerConfirmProps } from './types'
import Close from '../../icon/Close.vue'
import { getUniqueID } from '../../utils/random'
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const props = withDefaults(defineProps<DrawerConfirmProps>(), {
  direction: 'ltr',
  size: 'w-[40vw] min-w-[250px]',
  confirmText: '确定',
  cancelText: '取消',
})

const route = useRoute()

const status = ref(false)
const drawerToggleRef = ref<HTMLInputElement | null>(null)

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

const emit = defineEmits(['open', 'close', 'submit'])

const open = () => {
  status.value = true
}
const close = () => {
  status.value = false
}

const submit = () => {
  // useFormValidation(props.formRef, () => {
  emit('submit')
  close()
  // })
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
