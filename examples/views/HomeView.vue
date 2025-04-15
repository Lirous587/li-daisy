<template>
  <div class="p-10">
    <h1 class="text-xl font-bold">全部Li-Daisy组件库</h1>

    <div class="mt-5 grid gap-4 grid-cols-5">
      <a
        class="hover:bg-base-300 hover-shadow-lg rounded-md p-5 elevated-lg transition-all duration-500"
        v-for="(item, index) in list"
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
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface ComponetItem {
  img: string
  url: string
  title: string
  details: string
}

const list = ref<ComponetItem[]>([
  {
    img: 'https://picsum.photos/600/600',
    url: '/avatar',
    title: 'Avatar头像',
    details: '用于在界面中显示的缩略图',
  },
  {
    img: 'https://picsum.photos/600/600',
    url: '/collapse',
    title: 'Collapse折叠面板',
    details: '用于在界面中显示的缩略图',
  },
  {
    img: 'https://picsum.photos/600/600',
    url: '/drawer',
    title: 'Drawer抽屉',
    details: '用于显示/隐藏页面左侧或右侧的侧边栏',
  },
])
</script>
