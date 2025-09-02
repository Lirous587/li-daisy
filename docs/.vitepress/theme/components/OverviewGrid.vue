<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-5">
    <a
      v-for="(item, index) in componentList"
      :key="index"
      :href="item.url"
      class="card rounded-md !transition-transform duration-300 hover:translate-y-[-3px] hover:bg-base-200 !no-underline"
    >
      <figure class="px-4 pt-4">
        <img
          class="border-base-content/5 bg-base-300 rounded-lg border dark:opacity-75"
          loading="lazy"
          :src="item.img"
          :alt="item.title"
        />
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
