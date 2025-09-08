<!-- eslint-disable vue/valid-template-root -->
<template></template>

<script setup lang="ts">
import type {
  TableColumnProps,
  TableColumnDefaultScope,
  TableColumnHeaderScope,
  TableColumnExpandScope,
} from './types'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = withDefaults(defineProps<TableColumnProps>(), {
  align: 'center',
  headerAlign: 'center',
})

defineSlots<{
  header(props: TableColumnHeaderScope): void
  //  @typescript-eslint/no-explicit-any
  default(props: TableColumnDefaultScope<any>): void
  //  @typescript-eslint/no-explicit-any
  expand(props: TableColumnExpandScope<any>): void
}>()
</script>
