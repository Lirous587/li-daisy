<template>
  <div class="p-2">
    <h1>Li-Daisy组件库</h1>
    <div class="mx-auto mt-5 grid grid-cols-1 md:grid-cols-2 gap-8">
      <a
        class="hover:bg-base-300 hover-shadow rounded-md p-4 elevated-lg transition-all duration-500"
        style="transition: 500ms all"
        v-for="(item, index) in list"
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
    details: '用于展示和隐藏信息',
  },
  {
    img: 'https://picsum.photos/600/600',
    url: '/drawer',
    title: 'Drawer抽屉',
    details: '用于显示/隐藏页面左侧或右侧的侧边栏',
  },
])
</script>
