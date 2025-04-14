<template>
  <div class="mt-5 grid gap-4 grid-cols-3">
    <a
      class="hover:bg-base-300 hover-shadow rounded-md p-5 elevated-lg transition-all duration-500 space-y-4"
      style="transition: 500ms all"
      v-for="(item, index) in componentList"
      :key="index"
      :href="item.url"
    >
      <div class="card card-body bg-base-200 h-30">
        <div class="m-auto">
          <img :src="item.img" class="w-20 h-20 rounded-md" />
        </div>
      </div>
      <span class="text-lg font-bold">{{ item.title }}</span>
      <p class="text-sm font-serif opacity-70">{{ item.details }}</p>
    </a>
  </div>
</template>

<script setup lang="ts">
interface ComponentItem {
  img: string
  url: string
  title: string
  details: string
}

defineProps<{
  componentList: ComponentItem[]
}>()
</script>
