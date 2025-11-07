<script setup lang="ts">
import { ref } from 'vue'

const count = ref(0)

const handleAdd = () => {
  count.value++
}
</script>

<template>
  <div class="flex items-center gap-x-4">
    {{ count }}
    <span class="li-btn li-btn-sm" @click="handleAdd"> + </span>
  </div>
</template>
