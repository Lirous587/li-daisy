<template>
  <!-- 服务端渲染时，内容保持在原位置但隐藏 -->
  <div v-if="!isMounted" class="contents">
    <div class="fixed -left-full -top-full opacity-0 pointer-events-none">
      <slot />
    </div>
  </div>

  <!-- 客户端激活后，移动到 body -->
  <Teleport v-else-if="isMounted && targetExists" to="body">
    <slot />
  </Teleport>

  <!-- 降级方案：如果目标不存在，使用固定定位 -->
  <div v-else class="fixed inset-0 pointer-events-none" style="z-index: 9999">
    <div class="pointer-events-auto">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'

interface Props {
  to?: string
}

const props = withDefaults(defineProps<Props>(), {
  to: 'body',
})

const isMounted = ref(false)
const targetExists = ref(false)

onMounted(async () => {
  await nextTick()

  // 检查目标容器是否存在
  const target = document.querySelector(props.to)
  targetExists.value = !!target

  isMounted.value = true
})
</script>
