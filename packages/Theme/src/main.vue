<template>
  <div class="dropdown dropdown-end">
    <div tabindex="0" role="button" class="flex btn">
      <IconBookshelf class="w-6 h-6" />
    </div>

    <ul tabindex="0" class="menu dropdown-content bg-base-200 rounded-box z-1 p-2 shadow-sm">
      <div class="h-80 w-40 overflow-auto no-scrollbar">
        <li
          v-for="(theme, index) in list"
          @click="setTheme(theme)"
          class="flex items-center justify-stretch gap-x-1"
          :key="index"
        >
          <a class="w-full">
            <div
              :data-theme="theme"
              class="bg-base-100 grid shrink-0 grid-cols-2 grid-rows-2 gap-0.5 rounded-md p-1 shadow-sm"
            >
              <div class="bg-base-100 size-1 rounded-full"></div>
              <div class="bg-primary size-1 rounded-full"></div>
              <div class="bg-secondary size-1 rounded-full"></div>
              <div class="bg-neutral size-1 rounded-full"></div>
            </div>
            {{ theme }}
            <IconCheck v-if="nowTheme === theme" class="shrink-0 m-auto w-6 h-6" />
          </a>
        </li>
      </div>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { watch } from 'vue'
import IconBookshelf from '../../icon/Bookshelf.vue'
import IconCheck from '../../icon/Check.vue'
import type { ThemeControllerProps } from './types'
import { computed } from 'vue'

const nowTheme = defineModel<string>('theme')
const ifDark = defineModel<boolean>('ifDark')

const props = withDefaults(defineProps<ThemeControllerProps>(), {
  themes: () => [
    'default',
    'dark',
    'cupcake',
    'bumblebee',
    'emerald',
    'corporate',
    'synthwave',
    'retro',
    'cyberpunk',
    'valentine',
    'halloween',
    'garden',
    'forest',
    'aqua',
    'lofi',
    'pastel',
    'fantasy',
    'wireframe',
    'black',
    'luxury',
    'dracula',
    'cmyk',
    'autumn',
    'business',
    'acid',
    'lemonade',
    'night',
    'coffee',
    'winter',
    'dim',
    'nord',
    'sunset',
    'caramellatte',
    'abyss',
    'silk',
  ],
  darkThemes: () => [
    'dark',
    'synthwave',
    'halloween',
    'forest',
    'aqua',
    'black',
    'luxury',
    'dracula',
    'business',
    'night',
    'coffee',
    'dim',
    'sunset',
    'abyss',
  ],
})

// 主题列表
const list = computed(() => props.themes)

const emit = defineEmits<{
  change: [theme: string]
}>()

const setTheme = (theme: string) => {
  nowTheme.value = theme
  emit('change', theme)
}

watch(nowTheme, (newTheme) => {
  if (typeof newTheme === 'string') {
    if (props.darkThemes.includes(newTheme)) {
      ifDark.value = true
    } else {
      ifDark.value = false
    }
  } else {
    ifDark.value = false
  }
})
</script>
