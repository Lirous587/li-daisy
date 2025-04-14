<template>
  <div class="p-10">
    <h1 class="text-xl font-bold">全部Li-Daisy组件库</h1>

    <div class="mt-5 grid gap-4 grid-cols-5">
      <div
        class="hover:bg-base-300 hover-shadow-lg rounded-md p-5 elevated-lg transition-all duration-500"
        v-for="(item, index) in list"
        :key="index"
      >
        <div class="card card-body bg-base-200 h-40">
          <div class="m-auto">
            <component :is="getComponentByType(item.url)" />
          </div>
        </div>
        <span class="text-lg font-bold">{{ item.title }}</span>
        <p class="text-sm font-serif opacity-70">{{ item.details }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { LiDaisy } from '@/index'
import { h } from 'vue'
import { ref } from 'vue'

interface ComponetItem {
  url: string
  title: string
  details: string
}

const list = ref<ComponetItem[]>([
  {
    url: '/avatar',
    title: 'Avatar头像',
    details: '用于在界面中显示的缩略图',
  },
  {
    url: '/collapse',
    title: 'Collapse折叠面板',
    details: '用于显示和隐藏内容',
  },
])

// 根据组件类型返回对应的组件
const getComponentByType = (type: string) => {
  switch (type) {
    case '/avatar':
      return h(LiDaisy.Avatar, {
        name: '用户名',
        avatar: 'https://picsum.photos/600/600',
        size: 'lg',
      })
    case '/collapse':
      return h(LiDaisy.Collapse, { icon: 'arrow', class: 'm-4' }, () => [
        h(LiDaisy.Collapse.Item, { title: '示例' }, () => '折叠面板内容示例'),
        h(LiDaisy.Collapse.Item, { title: '示例' }, () => '折叠面板内容示例'),
      ])
    default:
      return h('div', {}, '组件示例')
  }
}
</script>
