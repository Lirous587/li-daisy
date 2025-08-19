<template>
  <div class="li-demo card rounded-lg border border-base-300 bg-accent-content">
    <div class="card-body">
      <!-- 组件预览区域 -->
      <div class="relative overflow-auto py-4 vp-raw">
        <ClientOnly>
          <component class="vp-raw" :is="demoComponent" v-if="demoComponent" />
        </ClientOnly>
      </div>
    </div>

    <div class="relative border-t border-base-300">
      <div class="flex p-3 mr-3">
        <div class="ml-auto cursor-pointer tooltip" @click="toggleCode" data-tip="显示源码">
          <svg data-v-5009ca8d="" viewBox="0 0 24 24" width="1.2em" height="1.2em">
            <path
              fill="currentColor"
              d="m23 12l-7.071 7.071l-1.414-1.414L20.172 12l-5.657-5.657l1.414-1.414L23 12zM3.828 12l5.657 5.657l-1.414 1.414L1 12l7.071-7.071l1.414 1.414L3.828 12z"
            ></path>
          </svg>
        </div>
        <div
          class="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]"
          v-show="codeLoading"
        >
          <span class="loading loading-dots loading-xs"></span>
        </div>
      </div>
      <div
        class="overflow-hidden text-sm transition-[height] duration-500 border-t border-base-300"
        :class="codeClass"
      >
        <div class="language-vue !m-0 !rounded-none">
          <div v-html="highlightedHtml"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, shallowRef, onMounted, markRaw, type Component, computed, inject, watch } from 'vue'
import type { Highlighter } from 'shiki'

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
const codeLoading = ref(false)

const shikiHighlighter = inject<import('vue').Ref<Highlighter | null>>('shiki')

const codeClass = computed(() => (showCode.value ? 'h-fit' : 'h-[0]'))

const toggleCode = async () => {
  showCode.value = !showCode.value
  if (showCode.value && !highlightedHtml.value) {
    codeLoading.value = true
    await highlightCode()
    codeLoading.value = false
  }
}

// 4. 高亮代码的核心逻辑
async function highlightCode() {
  // 检查 highlighter 是否已准备好
  if (!shikiHighlighter?.value) {
    console.warn('Shiki highlighter is not ready yet.')
    // 可以选择显示更明确的提示，或者稍后重试
    highlightedHtml.value =
      '<div class="p-4 text-center text-warning">高亮器正在初始化，请稍候...</div>'
    return
  }

  try {
    const highlighter = shikiHighlighter.value
    const importPath = `../../../examples/${props.path}.vue`
    const matchingRawPath = Object.keys(rawModules).find(
      (p) => p.toLowerCase() === importPath.toLowerCase(),
    )

    if (matchingRawPath) {
      const code = (await rawModules[matchingRawPath]()) as string
      // 使用注入的 highlighter 进行高亮
      highlightedHtml.value = highlighter.codeToHtml(code, {
        lang: 'vue',
        theme: 'plastic',
      })
    } else {
      highlightedHtml.value = '<div class="p-4 text-center text-error">源码文件未找到</div>'
    }
  } catch (err) {
    console.error(`高亮代码失败: ${err instanceof Error ? err.message : String(err)}`)
    highlightedHtml.value = '<div class="p-4 text-center text-error">代码高亮失败</div>'
  }
}

//onMounted 只负责加载组件预览
onMounted(async () => {
  try {
    const importPath = `../../../examples/${props.path}.vue`
    const matchingPath = Object.keys(modules).find(
      (p) => p.toLowerCase() === importPath.toLowerCase(),
    )
    if (matchingPath) {
      const mod = await modules[matchingPath]()
      demoComponent.value = markRaw(mod.default)
    } else {
      console.error(`找不到组件预览: ${importPath}`)
    }
  } catch (err) {
    console.error(`加载组件预览失败: ${err instanceof Error ? err.message : String(err)}`)
  }
})
</script>
