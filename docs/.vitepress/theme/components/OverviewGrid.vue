<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-5">
    <a
      v-for="(item, index) in componentList"
      :key="index"
      :href="item.url"
      class="rounded-md card elevated-lg hover:bg-base-200 duration-500 !transition-all !no-underline"
    >
      <figure class="px-8 pt-8">
        <div class="h-24 w-full overflow-hidden rounded-xl">
          <img :src="item.img" :alt="item.title" class="object-cover w-full" />
        </div>
      </figure>

      <div class="card-body">
        <div class="card-title">{{ item.title }}</div>
        <div class="text-xs font-serif opacity-70 mt-2">{{ item.details }}</div>
      </div>
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
