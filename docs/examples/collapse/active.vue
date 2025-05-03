<template>
  <div class="spacy-4">
    <Collapse class="w-full" icon="arrow" default="secondary" active="primary">
      <CollapseItem title="Li-Daisy"> 小而美的组件库 </CollapseItem>
    </Collapse>
    <Collapse class="w-full" icon="arrow" default="info" active="primary">
      <CollapseItem title="Li-Daisy"> 小而美的组件库 </CollapseItem>
    </Collapse>
    <Collapse class="w-full" border default="info" active="primary">
      <CollapseItem title="只要设置了border"> default或active不再展示 </CollapseItem>
    </Collapse>
  </div>
</template>

<script setup lang="ts">
import { Collapse, CollapseItem } from 'li-daisy'
</script>
