<template>
  <div class="flex gap-4 items-center m-3">
    <Avatar v-for="size in sizes" url="https://picsum.photos/600/600" :size="size" />
  </div>
</template>

<script setup lang="ts">
import { Avatar, type AvatarSize } from 'li-daisy'
import { ref } from 'vue'

const sizes = ref<AvatarSize[]>(['xs', 'sm', 'md', 'lg', 'xl'])
</script>
