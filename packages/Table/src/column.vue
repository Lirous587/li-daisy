<template></template>

<script setup lang="ts">
import type {
  TableColumnProps,
  TableColumnDefaultScope,
  TableColumnHeaderScope,
  TableColumnExpandScope,
} from './types'

const props = withDefaults(defineProps<TableColumnProps>(), {
  align: 'center',
  headerAlign: 'center',
})

defineSlots<{
  header(props: TableColumnHeaderScope): void
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  default(props: TableColumnDefaultScope<Record<string, any>>): void
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  expand(props: TableColumnExpandScope<Record<string, any>>): void
}>()
</script>
