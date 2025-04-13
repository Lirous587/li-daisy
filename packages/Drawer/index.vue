<template>
  <div class="drawer" :class="drawerDirection">
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

    <div class="drawer-side z-[100]">
      <!-- 蒙层 -->
      <label :for="drawerId" aria-label="close sidebar" class="drawer-overlay"></label>
      <div class="bg-base-200 text-base-content min-h-full p-4" :style="{ width: props.size }">
        <h3 class="text-xl font-bold text-base-content mb-3">
          {{ props.title }}
        </h3>
        <!-- Sidebar content here -->
        <slot name="content" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import type { DrawerExpose } from './drawer'
import { useRouter } from 'vue-router'

interface DrawerProps {
  title?: string
  direction?: 'ltr' | 'rtl'
  size?: string
}

const props = withDefaults(defineProps<DrawerProps>(), {
  title: '',
  direction: 'ltr',
  size: '40%',
})

const route = useRouter()

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

watch(route, () => {
  close()
})

const exposeObject: DrawerExpose = {
  open,
  close,
}
defineExpose(exposeObject)
</script>
