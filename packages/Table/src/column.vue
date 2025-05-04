<template></template>

<script setup lang="ts">
import type { TableColumnProps } from './types'
const props = withDefaults(defineProps<TableColumnProps>(), {
  align: 'center',
  headerAlign: 'center',
})

defineSlots<{
  header(props: { label: string | undefined; prop: string | undefined }): void
  default(props: { row: Record<string, unknown>; index: number }): void
}>()
</script>
