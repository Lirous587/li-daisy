<script setup lang="ts">
import { inject } from 'vue'
import { useData } from 'vitepress'

const { isDark } = useData()
const toggleAppearance = inject<(event: MouseEvent) => Promise<void>>('toggle-appearance')!

const handleClick = (event: MouseEvent) => {
  toggleAppearance(event)
}
</script>

<template>
  <div>
    <button
      class="VPSwitchAppearance custom-switch"
      type="button"
      role="switch"
      :aria-checked="isDark"
      @click="handleClick"
      title="切换主题"
    >
      <!-- 在这里放置你的自定义图标或内容 -->
      <span v-if="isDark">🌙</span>
      <span v-else>☀️</span>
    </button>
  </div>
</template>

<style scoped>
.custom-switch {
  /* 添加你自定义组件的样式 */
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid var(--vp-c-divider);
  border-radius: 50%;
  background-color: var(--vp-c-bg-soft);
  cursor: pointer;
  transition:
    border-color 0.25s,
    background-color 0.25s;
}
.custom-switch:hover {
  border-color: var(--vp-c-brand);
}
.custom-switch span {
  font-size: 18px; /* 图标大小 */
}
</style>
