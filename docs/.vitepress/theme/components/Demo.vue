<template>
  <div class="card my-3 rounded-lg border border-base-300">
    <div class="card-body">
      <!-- 组件预览区域 -->
      <div class="relative">
        <ClientOnly>
          <component :is="demoComponent" v-if="demoComponent" />
        </ClientOnly>
      </div>
    </div>

    <div class="relative border-t border-base-300">
      <div class="flex p-3 mr-3">
        <div
          class="ml-auto cursor-pointer tooltip"
          @click="toggleCode"
          :data-tip="showCode ? '隐藏源码' : '显示源码'"
        >
          <svg data-v-5009ca8d="" viewBox="0 0 24 24" width="1.2em" height="1.2em">
            <path
              fill="currentColor"
              d="m23 12l-7.071 7.071l-1.414-1.414L20.172 12l-5.657-5.657l1.414-1.414L23 12zM3.828 12l5.657 5.657l-1.414 1.414L1 12l7.071-7.071l1.414 1.414L3.828 12z"
            ></path>
          </svg>
        </div>
      </div>
      <div
        class="overflow-hidden text-sm transition-[height] duration-500 border-t border-base-300"
        :class="codeClass"
      >
        <div class="language-vue !my-0 !rounded-none">
          <pre class="!p-0" v-html="highlightedHtml"></pre>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, shallowRef, onMounted, markRaw, type Component, computed } from 'vue'

import { createHighlighter } from 'shiki'

// @ts-ignore  组件模块

// @ts-ignore  组件模块
const modules = import.meta.glob<{ default: Component }>('../../../examples/**/*.vue')
// @ts-ignore  源码模块
const rawModules = import.meta.glob('../../../examples/**/*.vue', {
  query: '?raw',
  import: 'default',
})

interface DemoProps {
  path: string
}

const props = defineProps<DemoProps>()

const showCode = ref(false)
const demoComponent = shallowRef<Component | null>(null)
const highlightedHtml = ref('')

const toggleCode = () => {
  showCode.value = !showCode.value
}

const codeClass = computed(() => (showCode.value ? 'h-fit' : 'h-[0]'))

onMounted(async () => {
  const highlighter = await createHighlighter({
    themes: ['github-light', 'plastic'],
    langs: ['vue-html'],
  })

  try {
    const importPath = `../../../examples/${props.path}.vue`
    const matchingPath = Object.keys(modules).find(
      (p) => p.toLowerCase() === importPath.toLowerCase(),
    )
    const matchingRawPath = Object.keys(rawModules).find(
      (p) => p.toLowerCase() === importPath.toLowerCase(),
    )

    if (matchingPath) {
      const mod = await modules[matchingPath]()
      demoComponent.value = markRaw(mod.default)
    }

    if (matchingRawPath) {
      const code = await rawModules[matchingRawPath]()

      highlightedHtml.value = highlighter.codeToHtml(code, {
        lang: 'vue-html',
        theme: 'plastic',
      })
    }
  } catch (err) {
    console.error(`加载组件失败: ${err instanceof Error ? err.message : String(err)}`)
  }
})
</script>
