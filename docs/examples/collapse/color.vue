<template>
  <div class="spacy-4">
    <div class="grid grid-cols-2 gap-4">
      <div>
        <Collapse v-for="active in actives" class="w-full" icon="arrow" :active-color="active">
          <CollapseItem :title="active"> item 1</CollapseItem>
          <CollapseItem :title="active"> item 2</CollapseItem>
        </Collapse>
      </div>

      <div>
        <Collapse v-for="def in defaults" class="w-full" icon="arrow" :default-color="def">
          <CollapseItem :title="def"> item 1 </CollapseItem>
          <CollapseItem :title="def"> item 2 </CollapseItem>
        </Collapse>
      </div>
    </div>

    <Collapse class="w-full" border default-color="info" active-color="primary">
      <CollapseItem title="设置了default或active"> CollapseItem间的border不再显示 </CollapseItem>
      <CollapseItem title="设置了default或active"> CollapseItem间的border不再显示 </CollapseItem>
    </Collapse>
  </div>
</template>

<script setup lang="ts">
import {
  Collapse,
  CollapseItem,
  type CollapseActiveColor,
  type CollapseDefaultColor,
} from 'li-daisy'

import { ref } from 'vue'

const actives = ref<CollapseActiveColor[]>([
  'base',
  'primary',
  'secondary',
  'neutral',
  'accent',
  'info',
  'success',
  'warning',
  'error',
])
const defaults = ref<CollapseDefaultColor[]>([
  'base',
  'primary',
  'secondary',
  'neutral',
  'accent',
  'info',
  'success',
  'warning',
  'error',
])
</script>
