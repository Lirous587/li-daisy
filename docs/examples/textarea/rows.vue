<template>
  <Textarea
    v-model="text"
    placeholder="请输入文本"
    :min-rows="1"
    :max-rows="6"
    :auto-grow="false"
  />
</template>

<script setup lang="ts">
import { Textarea } from 'li-daisy'
import { ref } from 'vue'

const text = ref<string>('1\n2\n3\n4\n5\n6\n7')
</script>
