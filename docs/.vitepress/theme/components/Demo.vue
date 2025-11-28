<template>
  <div class="li-demo card rounded-box border overflow-hidden border-base-300" v-bind="$attrs">
    <div class="card-body">
      <div class="relative overflow-auto py-4 vp-raw">
        <slot name="source" />
      </div>
    </div>

    <div class="relative border-t border-base-300">
      <div class="flex p-3 mr-3">
        <div class="ml-auto cursor-pointer tooltip" data-tip="显示源码" @click="toggleCode">
          <svg viewBox="0 0 24 24" width="1.2em" height="1.2em">
            <path
              fill="currentColor"
              d="m23 12l-7.071 7.071l-1.414-1.414L20.172 12l-5.657-5.657l1.414-1.414L23 12zM3.828 12l5.657 5.657l-1.414 1.414L1 12l7.071-7.071l1.414 1.414L3.828 12z"
            ></path>
          </svg>
        </div>
      </div>
      <div
        class="text-sm transition-[height] duration-500 border-t relative border-base-300"
        :class="codeClass"
      >
        <slot name="rawSource" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const showCode = ref(false)
const codeClass = computed(() => (showCode.value ? 'h-fit' : 'h-[0]'))

const toggleCode = () => {
  showCode.value = !showCode.value
}
</script>
