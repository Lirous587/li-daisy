<template>
  <div class="flex flex-col gap-y-4">
    <TextInput v-for="size in sizes" v-model="text" :size="size" placeholder="请输入文本" />
  </div>
</template>

<script setup lang="ts">
// import { TextInput, type TextInputSize } from 'li-daisy'
import { TextInput, type TextInputSize } from '../../../packages'

import { ref } from 'vue'

const sizes = ref<TextInputSize[]>(['xs', 'sm', 'md', 'lg', 'xl'])

const text = ref<string>('')
</script>
