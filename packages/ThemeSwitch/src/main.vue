<template>
  <button
    ref="containerRef"
    class="relative li-btn ld-btn-sm hover:border-primary rounded-full h-6 w-12 overflow-hidden"
    @click="switchTheme"
  >
    <template v-if="isHydrated">
      <transition name="sun">
        <span
          v-if="nowTheme === props.lightTheme"
          class="absolute left-0 top-1/2 translate-y-[-50%] text-base-content h-5 w-5 p-0.5 bg-base-100 rounded-full flex"
        >
          <SunIcon class="h-4 w-4 m-auto" />
        </span>
      </transition>
      <transition name="moon">
        <span
          v-if="nowTheme === props.darkTheme"
          class="absolute right-0 top-1/2 translate-y-[-50%] text-base-content h-5 w-5 p-0.5 bg-base-100 rounded-full flex"
        >
          <MoonIcon class="h-4 w-4 m-auto" />
        </span>
      </transition>
    </template>

    <!-- 水合前的占位内容 -->
    <template v-else>
      <span
        class="li-theme-placeholder-sun absolute left-0 top-1/2 translate-y-[-50%] text-base-content h-5 w-5 p-0.5 bg-base-100 rounded-full flex"
      >
        <SunIcon class="h-4 w-4 m-auto" />
      </span>
      <span
        class="li-theme-placeholder-moon absolute right-0 top-1/2 translate-y-[-50%] text-base-content h-5 w-5 p-0.5 bg-base-100 rounded-full flex"
      >
        <MoonIcon class="h-4 w-4 m-auto" />
      </span>
    </template>
  </button>
</template>

<script setup lang="ts">
import { SunIcon, MoonIcon } from '@heroicons/vue/24/outline'
import type { ThemeSwitchProps, ThemeSwitchRef } from './types'
import { computed, nextTick, onMounted, ref } from 'vue'
import { isClient } from '../../utils/ssr'

const props = withDefaults(defineProps<ThemeSwitchProps>(), {
  lightTheme: 'li-light',
  darkTheme: 'li-dark',
})

const emit = defineEmits<{
  toggle: [mode: 'light' | 'dark']
}>()

// 初始化为服务端的默认值,避免水合不一致
const nowTheme = ref(props.lightTheme)
const isDark = computed(() => nowTheme.value === props.darkTheme)

// 水合状态追踪
const isHydrated = ref(false)

const containerRef = ref<HTMLButtonElement>()

const setTheme = (theme: string) => {
  if (isClient()) {
    localStorage.setItem('li-daisy-theme', theme)
  }
}

const getTheme = () => {
  if (!isClient()) return props.lightTheme

  const validThemes = [props.lightTheme, props.darkTheme]
  const stored = localStorage.getItem('li-daisy-theme')

  if (stored && validThemes.includes(stored)) {
    return stored
  }

  if (window.matchMedia?.('(prefers-color-scheme: dark)').matches) {
    return props.darkTheme
  }

  return props.lightTheme
}

const applyTheme = () => {
  if (!isClient()) return

  document.documentElement.setAttribute('data-theme', nowTheme.value)
  document.documentElement.classList.toggle('dark', isDark.value)
}

const switchTheme = () => {
  if (!isClient()) return

  // 添加禁用过渡的类
  document.documentElement.classList.add('disable-transitions')

  // 主题反转
  nowTheme.value = nowTheme.value === props.darkTheme ? props.lightTheme : props.darkTheme
  setTheme(nowTheme.value)
  applyTheme()

  emit('toggle', isDark.value ? 'dark' : 'light')

  // 强制重绘,确保禁用过渡生效
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  document.documentElement.offsetHeight

  // 在下一帧移除禁用类,恢复过渡
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      document.documentElement.classList.remove('disable-transitions')
    })
  })
}

onMounted(() => {
  // 在客户端获取真实的主题偏好
  nowTheme.value = getTheme()
  applyTheme()

  // 标记为已水合
  nextTick(() => {
    isHydrated.value = true
  })
})

const exposeObject: ThemeSwitchRef = {
  get nowTheme(): string {
    return nowTheme.value
  },
  get isDark(): boolean {
    return isDark.value
  },
}

defineExpose(exposeObject)
</script>

<style scoped>
.sun-enter-active,
.sun-leave-active,
.moon-enter-active,
.moon-leave-active {
  transition: all 0.3s ease;
}

.sun-enter-from {
  transform: translateX(28px);
  opacity: 0;
}
.sun-enter-to {
  opacity: 1;
}

.sun-leave-from {
  opacity: 0;
}

.sun-leave-to {
  opacity: 0;
}

.moon-enter-from {
  transform: translateX(-28px);
  opacity: 0;
}
.moon-enter-to {
  opacity: 1;
}

.moon-leave-from {
  opacity: 0;
}
.moon-leave-to {
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

/* 禁用过渡 */
:global(.disable-transitions),
:global(.disable-transitions *),
:global(.disable-transitions *::before),
:global(.disable-transitions *::after) {
  transition: none !important;
  animation: none !important;
}
</style>
