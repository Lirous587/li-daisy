<template>
  <div class="spacy-4">
    <Collapse class="w-full" icon="arrow" default="accent">
      <CollapseItem title="Li-Daisy"> 仅设置active </CollapseItem>
    </Collapse>
    <Collapse class="w-full" icon="arrow" active="info">
      <CollapseItem title="Li-Daisy"> 仅设置active </CollapseItem>
    </Collapse>
    <Collapse class="w-full" icon="arrow" default="secondary" active="primary">
      <CollapseItem title="Li-Daisy"> 同时设置default和active </CollapseItem>
    </Collapse>
    <Collapse class="w-full" border default="info" active="primary">
      <CollapseItem title="设置了default或active"> border不再显示 </CollapseItem>
    </Collapse>
  </div>
</template>

<script setup lang="ts">
import { Collapse, CollapseItem } from 'li-daisy'
</script>
