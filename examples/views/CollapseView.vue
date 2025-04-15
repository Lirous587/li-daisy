<template>
  <div class="space-y-5">
    <Collapse icon="arrow" default="secondary" active="primary">
      <CollapseItem
        title="How do I create an account?How do I create an account?How do I create an account?How do I create an account?How do I create an account?How do I create an account?How do I create an account?"
      >
        Click the "Sign Up" button in the top right corner and follow the registration process.
      </CollapseItem>
      <CollapseItem title="折叠项2"> item2 </CollapseItem>
    </Collapse>
    <Collapse icon="plus" default="secondary" active="primary" :show-border="true">
      <CollapseItem
        title="How do I create an account?How do I create an account?How do I create an account?How do I create an account?How do I create an account?How do I create an account?How do I create an account?"
      >
        Click the "Sign Up" button in the top right corner and follow the registration process.
      </CollapseItem>
    </Collapse>
  </div>
</template>

<script setup lang="ts">
import { Collapse, CollapseItem } from '@/Collapse'
</script>
