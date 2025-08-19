<template>
  <div class="flex flex-col gap-y-5">
    <Collapse class="w-full" border>
      <CollapseItem title="border属性只在CollapseItem之间生效"> 注意观察边框 </CollapseItem>
      <CollapseItem title="border属性只在CollapseItem之间生效"> 注意观察边框 </CollapseItem>
    </Collapse>
    <Collapse class="w-full border border-base-300 rounded-md" border>
      <CollapseItem title="当前为父级设置了边框"> 注意观察边框 </CollapseItem>
      <CollapseItem title="当前为父级设置了边框"> 注意观察边框 </CollapseItem>
    </Collapse>
  </div>
</template>

<script setup lang="ts">
import { Collapse, CollapseItem } from 'li-daisy'
// import { Collapse, CollapseItem } from '../../../packages'
</script>
