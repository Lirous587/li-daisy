<template>
  <div class="mx-auto mt-5 grid grid-cols-1 md:grid-cols-2 gap-8">
    <a
      class="hover:bg-base-300 hover-shadow rounded-md p-4 elevated-lg !transition-all duration-500"
      v-for="(item, index) in componentList"
      :key="index"
      :href="item.url"
    >
      <div class="card card-body bg-base-200">
        <div class="m-auto w-25 h-25">
          <img :src="item.img" class="rounded-md" />
        </div>
      </div>
      <p class="font-bold">{{ item.title }}</p>
      <p class="text-xs font-serif opacity-70">{{ item.details }}</p>
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
