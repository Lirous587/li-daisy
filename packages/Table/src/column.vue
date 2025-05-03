<template></template>

<script setup lang="ts">
import type { TableColumnProps } from './types'
const props = withDefaults(defineProps<TableColumnProps>(), {
  align: 'center',
  headerAlign: 'center',
})
</script>
