<template>
  <button
    ref="containerRef"
    class="relative btn btn-sm hover:!border-primary rounded-xl h-6 w-12 overflow-hidden"
    @click="switchTheme"
  >
    <template v-if="isHydrated">
      <transition name="sun">
        <span
          v-if="nowTheme === props.lightTheme"
          class="absolute left-1 top-1/2 translate-y-[-50%] h-4 w-4 text-base-content"
        >
          <SunIcon />
        </span>
      </transition>
      <transition name="moon">
        <span
          v-if="nowTheme === props.darkTheme"
          class="absolute right-1 top-1/2 translate-y-[-50%] h-4 w-4 text-base-content"
        >
          <MoonIcon />
        </span>
      </transition>
    </template>

    <!-- 水合前的占位内容 -->
    <template v-else>
      <span
        class="li-theme-placeholder-sun absolute left-1 top-1/2 translate-y-[-50%] h-4 w-4 text-base-content"
      >
        <SunIcon />
      </span>
      <span
        class="li-theme-placeholder-moon absolute right-1 top-1/2 translate-y-[-50%] h-4 w-4 text-base-content"
      >
        <MoonIcon />
      </span>
    </template>
  </button>
</template>
<script setup lang="ts">
import { SunIcon, MoonIcon } from '@heroicons/vue/24/outline'
import type { ThemeSwitchProps } from './types'
import { computed, nextTick, onMounted, ref } from 'vue'
import { isClient, isServer } from '../../utils/ssr'

const props = withDefaults(defineProps<ThemeSwitchProps>(), {
  lightTheme: 'li-light',
  darkTheme: 'li-dark',
})

// 水合状态追踪
const isHydrated = ref(false)

const setTheme = (theme: string) => {
  if (isServer()) return
  localStorage.setItem('li-daisy-theme', theme)
}

const getTheme = () => {
  if (isServer()) return props.lightTheme

  const validThemes = [props.lightTheme, props.darkTheme]

  const stored = localStorage.getItem('li-daisy-theme')

  if (stored && validThemes.includes(stored)) {
    return stored
  }

  if (window.matchMedia?.('(prefers-color-scheme: dark)').matches) {
    return props.darkTheme
  }

  // 最终回退到默认浅色主题
  return props.lightTheme
}

// 初始化为服务端的默认值，避免水合不一致
const nowTheme = ref(props.lightTheme)

const isDark = computed(() => nowTheme.value === props.darkTheme)
const containerRef = ref<HTMLButtonElement>()

const applyTheme = () => {
  if (isServer()) return

  document.documentElement.setAttribute('data-theme', nowTheme.value)
  document.documentElement.classList.toggle('dark', isDark.value)
}

const switchAnimation = async (x: number, y: number) => {
  if (!enableTransitions()) {
    applyTheme()
    return
  }

  const clipPath = [
    `circle(0px at ${x}px ${y}px)`,
    `circle(${Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y)
    )}px at ${x}px ${y}px)`,
  ]

  await document.startViewTransition(async () => {
    applyTheme()
    await nextTick()
  }).ready

  document.documentElement.animate(
    { clipPath: isDark.value ? clipPath.reverse() : clipPath },
    {
      duration: 600,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      pseudoElement: `::view-transition-${isDark.value ? 'old' : 'new'}(root)`,
    }
  )
}

const switchTheme = async (event: MouseEvent) => {
  const { clientX: x, clientY: y } = event

  nowTheme.value = nowTheme.value === props.darkTheme ? props.lightTheme : props.darkTheme
  setTheme(nowTheme.value)

  // 执行动画
  await switchAnimation(x, y)
}

// 检查是否支持 View Transition
const enableTransitions = () =>
  isClient() &&
  'startViewTransition' in document &&
  window.matchMedia('(prefers-reduced-motion: no-preference)').matches

onMounted(() => {
  // 在客户端获取真实的主题偏好
  const actualTheme = getTheme()
  nowTheme.value = actualTheme

  applyTheme()
  // 标记为已水合
  nextTick(() => {
    isHydrated.value = true
  })
})
</script>

<style scoped>
.sun-enter-active,
.sun-leave-active,
.moon-enter-active,
.moon-leave-active {
  transition: all 0.4s ease-in-out;
}

.sun-enter-from {
  transform: translateX(-10px);
  opacity: 0;
}
.sun-enter-to {
  opacity: 1;
}

.sun-leave-to {
  transform: translateX(24px);
  opacity: 0;
}

.moon-enter-from {
  transform: translateX(10px);
  opacity: 0;
}
.moon-enter-to {
  opacity: 1;
}
.moon-leave-to {
  transform: translateX(-24px);
  opacity: 0;
}

/* 占位 */
.li-theme-placeholder-sun {
  display: block;
}

.li-theme-placeholder-moon {
  display: none;
}

html.dark .li-theme-placeholder-sun {
  display: none;
}

html.dark .li-theme-placeholder-moon {
  display: block;
}
</style>

<style>
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}

::view-transition-old(root),
.dark::view-transition-new(root) {
  z-index: 1;
}

::view-transition-new(root),
.dark::view-transition-old(root) {
  z-index: 99999;
}
</style>
