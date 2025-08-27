<template>
  <div class="flex flex-col gap-y-4">
    <Textarea v-for="size in sizes" v-model="text" :size="size" placeholder="请输入文本" />
  </div>
</template>

<script setup lang="ts">
import { Textarea, type TextareaSize } from 'li-daisy'
import { ref } from 'vue'

const sizes = ref<TextareaSize[]>(['xs', 'sm', 'md', 'lg', 'xl'])

const text = ref<string>('')
</script>
