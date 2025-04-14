<script setup lang="ts">
import { LiDaisy } from '@/index'
</script>
<template>
  <div class="flex flex-col space-y-3 p-10">
    <LiDaisy.Avatar name="用户名" avatar="https://picsum.photos/600/600" size="md" />
    <LiDaisy.Button class="btn-primary">你好</LiDaisy.Button>

    <LiDaisy.Collapse :show-border="true" icon="plus">
      <LiDaisy.Collapse.Item title="plus"
        >Click the "Sign Up" button in the top right corner and follow the registration process.
      </LiDaisy.Collapse.Item>
    </LiDaisy.Collapse>

    <LiDaisy.Collapse icon="arrow">
      <LiDaisy.Collapse.Item title="arow"
        >Click the "Sign Up" button in the top right corner and follow the registration process.
      </LiDaisy.Collapse.Item>
    </LiDaisy.Collapse>
  </div>
</template>
