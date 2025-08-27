<template>
  <NumberInput v-model="numberValue" placeholder="此输入框禁用" :disabled="true" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
// import { NumberInput } from 'li-daisy'
import { NumberInput, type NumberInputColor } from '../../../packages'

const numberValue = ref<number>(0)
</script>
