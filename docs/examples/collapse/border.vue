<template>
  <div class="flex flex-col gap-y-5">
    <Collapse class="w-full" border items-border>
      <CollapseItem title="border用于设置父级边框"> 注意观察边框 </CollapseItem>
      <CollapseItem title="border用于设置父级边框"> 注意观察边框 </CollapseItem>
    </Collapse>
    <Collapse class="w-full" :border="false" items-border>
      <CollapseItem title="items-border用于设置CollapseItem之间的边框"> 注意观察边框 </CollapseItem>
      <CollapseItem title="items-border用于设置CollapseItem之间的边框"> 注意观察边框 </CollapseItem>
    </Collapse>
  </div>
</template>

<script setup lang="ts">
import { Collapse, CollapseItem } from 'li-daisy'
</script>
