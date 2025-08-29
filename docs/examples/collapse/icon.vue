<template>
  <Collapse v-for="icon in icons" class="w-full border border-base-300 rounded-md" :icon="icon">
    <CollapseItem title="Li-Daisy"> 小而美的组件库 </CollapseItem>
  </Collapse>
</template>

<script setup lang="ts">
import { Collapse, CollapseItem, type CollapseIcon } from 'li-daisy'
import { ref } from 'vue'

const icons = ref<CollapseIcon[]>(['arrow', 'plus'])
</script>
