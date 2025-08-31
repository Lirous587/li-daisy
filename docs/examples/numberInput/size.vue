<template>
  <div class="flex flex-col gap-y-4">
    <NumberInput v-for="size in sizes" v-model="numberValue" :size="size" :min="0" :max="10" />
  </div>
</template>

<script setup lang="ts">
import { NumberInput, type NumberInputSize } from 'li-daisy'

import { ref } from 'vue'

const sizes = ref<NumberInputSize[]>(['xs', 'sm', 'md', 'lg', 'xl'])

const numberValue = ref<number>(0)
</script>
