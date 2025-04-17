<template>
  <Teleport to="body">
    <div class="drawer z-[100]" :class="drawerDirection">
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
          <slot />
        </label>
      </div>

      <div class="drawer-side">
        <!-- 蒙层 -->
        <label
          :for="drawerId"
          aria-label="close sidebar"
          class="drawer-overlay"
          @click.prevent="() => {}"
        ></label>
        <div
          class="bg-base-100 text-base-content min-h-full p-4 flex flex-col"
          :style="{ width: props.size }"
        >
          <h3 class="text-xl font-bold text-base-content mb-3">
            {{ props.title }}
          </h3>
          <!-- Sidebar content here -->
          <div class="mb-3 flex flex-col gap-x-4 items-start flex-1">
            <div class="flex-1">
              <slot name="content" />
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
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import type { DrawerExpose } from './drawer'
import type { FormExpose } from './form'
import { ref } from 'vue'
import { computed } from 'vue'
import { watch } from 'vue'

interface DrawerProps {
  title?: string
  direction?: 'ltr' | 'rtl'
  size?: string
  confirmText?: string
  cancelText?: string
  formRef: FormExpose | null
}

const props = withDefaults(defineProps<DrawerProps>(), {
  title: '',
  direction: 'rtl',
  size: '40%',
  confirmText: '确定',
  cancelText: '取消',
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

const exposeObject: DrawerExpose = {
  open,
  close,
}
defineExpose(exposeObject)
</script>
