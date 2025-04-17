<template>
  <div>
    <Collapse class="w-full" icon="plus">
      <CollapseItem title="Li-Daisy"> 小而美的组件库 </CollapseItem>
    </Collapse>
    <Collapse class="w-full" :show-border="true" icon="arrow">
      <CollapseItem title="Li-Daisy"> 小而美的组件库 </CollapseItem>
    </Collapse>
  </div>
</template>

<script setup lang="ts">
import { Collapse, CollapseItem } from 'li-daisy'
</script>
