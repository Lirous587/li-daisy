<template>
  <NumberInput v-model="priority" class="w-full" placeholder="请输入优先级" :max="30" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { NumberInput } from 'li-daisy'
const priority = ref(0)
</script>
