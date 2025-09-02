<template>
  <button
    class="relative btn btn-sm hover:!border-primary rounded-xl h-6 w-12 overflow-hidden"
    @click="switchTheme"
    ref="containerRef"
  >
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
  </button>
</template>

<script setup lang="ts">
import { SunIcon, MoonIcon } from '@heroicons/vue/24/outline'
import type { ThemeSwitchProps } from './types'
import { computed, nextTick, ref } from 'vue'
import Cookies from 'universal-cookie'

const props = withDefaults(defineProps<ThemeSwitchProps>(), {
  lightTheme: 'li-light',
  darkTheme: 'li-dark',
})

const cookies = new Cookies()

const setTheme = (theme: string) => {
  cookies.set('li-daisy-theme', theme)
}

const getTheme = () => {
  const validThemes = [props.lightTheme, props.darkTheme]

  try {
    const cookieTheme = cookies.get('li-daisy-theme')
    if (cookieTheme && validThemes.includes(cookieTheme)) {
      return cookieTheme
    }
  } catch (error) {
    // Cookie 读取失败时的静默处理
  }

  // 回退机制：尝试系统偏好（只在客户端环境）
  if (typeof window !== 'undefined' && window.matchMedia) {
    try {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return props.darkTheme
      }
    } catch (error) {
      // matchMedia 失败时的静默处理
    }
  }

  // 最终回退到默认浅色主题
  return props.lightTheme
}

const nowTheme = ref(getTheme())

const isDark = computed(() => nowTheme.value === props.darkTheme)

const containerRef = ref<HTMLButtonElement>()

const switchTheme = async (event: MouseEvent) => {
  const { clientX: x, clientY: y } = event

  if (nowTheme.value === props.darkTheme) {
    nowTheme.value = props.lightTheme
  } else if (nowTheme.value === props.lightTheme) {
    nowTheme.value = props.darkTheme
  } else {
    nowTheme.value = props.lightTheme
  }

  setTheme(nowTheme.value)

  // 执行动画
  await switchAnimation(x, y)
}

// 检查是否支持 View Transition
const enableTransitions = () =>
  'startViewTransition' in document &&
  window.matchMedia('(prefers-reduced-motion: no-preference)').matches

// 应用主题到 DOM
const applyTheme = () => {
  if (typeof document === 'undefined') return

  document.documentElement.setAttribute('data-theme', nowTheme.value)

  if (isDark.value) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

const switchAnimation = async (x: number, y: number) => {
  if (!enableTransitions()) {
    // 直接应用主题
    applyTheme()
    return
  }
  const clipPath = [
    `circle(0px at ${x}px ${y}px)`,
    `circle(${Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y),
    )}px at ${x}px ${y}px)`,
  ]

  await document.startViewTransition(async () => {
    applyTheme()
    await nextTick()
  }).ready

  document.documentElement.animate(
    { clipPath: isDark.value ? clipPath.reverse() : clipPath },
    {
      duration: 400,
      easing: 'ease-in',
      pseudoElement: `::view-transition-${isDark.value ? 'old' : 'new'}(root)`,
    },
  )
}

applyTheme()
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
