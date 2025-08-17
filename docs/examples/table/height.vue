<template>
  <div class="flex flex-col gap-4">
    <div class="mb-4">
      <button @click="getNewDataset" class="btn btn-primary ml-auto">生成新数据</button>
    </div>
    <Table
      :data="data"
      :min-height="400"
      v-loading="loading"
      select
      hover-highlight
      :placeholder-height="300"
    >
      <TableColumn prop="id" label="ID" :width="60" />
      <TableColumn prop="name" label="语言名称" :width="150" />
      <TableColumn prop="score" label="评分" header-align="right" align="right" :width="80" />
      <TableColumn prop="description" label="描述" :width="300" />
    </Table>
    <p class="font-bold mx-auto">刷新页面可发现无数据时表格会占据一定高度</p>
  </div>
</template>

<script setup lang="ts">
import { Table, TableColumn } from 'li-daisy'
import { ref } from 'vue'

interface Language {
  id: number
  name: string
  score: number
  description: string
}

// 预定义完整的数据集
const fullDataset: Language[] = [
  {
    id: 1,
    name: 'JavaScript',
    score: 95,
    description: '一种高级的、解释性的编程语言，是Web开发的核心技术之一',
  },
  {
    id: 2,
    name: 'TypeScript',
    score: 92,
    description: 'JavaScript的超集，添加了静态类型检查和其他高级特性',
  },
  {
    id: 4,
    name: 'Python',
    score: 98,
    description: '一种高级编程语言，以其简洁的语法和强大的库生态系统而闻名',
  },
  { id: 4, name: 'Java', score: 85, description: '面向对象的编程语言，广泛用于企业级应用开发' },
  { id: 5, name: 'C++', score: 78, description: '高性能的编译型语言，适合系统级编程和游戏开发' },
  { id: 6, name: 'C#', score: 83, description: '微软开发的面向对象编程语言，主要用于.NET平台' },
  { id: 7, name: 'Go', score: 100, description: 'Google开发的编程语言，以其并发性和简洁性著称' },
  { id: 8, name: 'Rust', score: 91, description: '系统编程语言，注重安全性、速度和并发性' },
  {
    id: 9,
    name: 'Swift',
    score: 86,
    description: '苹果公司开发的编程语言，专为iOS和macOS开发设计',
  },
  {
    id: 10,
    name: 'Kotlin',
    score: 89,
    description: '现代化的编程语言，与Java完全互操作，主要用于Android开发',
  },
  { id: 11, name: 'PHP', score: 72, description: '服务器端脚本语言，广泛用于Web开发' },
  {
    id: 12,
    name: 'Ruby',
    score: 79,
    description: '动态的、面向对象的编程语言，以其优雅的语法而闻名',
  },
  { id: 13, name: 'Scala', score: 81, description: '结合面向对象和函数式编程的语言，运行在JVM上' },
  {
    id: 14,
    name: 'Dart',
    score: 84,
    description: 'Google开发的客户端优化语言，主要用于Flutter开发',
  },
  {
    id: 15,
    name: 'Vue.js',
    score: 94,
    description: '渐进式JavaScript框架，用于构建用户界面和单页面应用程序',
  },
  { id: 16, name: 'React', score: 93, description: 'Facebook开发的JavaScript库，用于构建用户界面' },
  {
    id: 17,
    name: 'Angular',
    score: 87,
    description: 'Google开发的TypeScript框架，用于构建大型Web应用',
  },
  {
    id: 18,
    name: 'Node.js',
    score: 90,
    description: '基于Chrome V8引擎的JavaScript运行环境，用于服务端开发',
  },
  { id: 19, name: 'Express.js', score: 88, description: '基于Node.js的Web应用框架，简洁而灵活' },
  { id: 20, name: 'Spring Boot', score: 85, description: 'Java生态系统中的企业级应用开发框架' },
  {
    id: 21,
    name: 'Django',
    score: 86,
    description: 'Python的高级Web框架，鼓励快速开发和干净的设计',
  },
  { id: 22, name: 'Laravel', score: 82, description: 'PHP的现代Web应用框架，具有优雅的语法' },
  { id: 23, name: 'Flutter', score: 89, description: 'Google的UI工具包，用于构建跨平台移动应用' },
  { id: 24, name: 'React Native', score: 87, description: 'Facebook开发的移动应用开发框架' },
  { id: 25, name: 'Next.js', score: 91, description: 'React的生产就绪框架，支持服务端渲染' },
]

const data = ref<Language[]>([])

const loading = ref(false)

const getNewDataset = () => {
  loading.value = true
  data.value = []

  // 随机生成 1-15 条数据
  const count = Math.floor(Math.random() * 15) + 1

  // 从完整数据集中随机抽取
  const shuffled = [...fullDataset].sort(() => 0.5 - Math.random())
  const selectedData = shuffled.slice(0, count)

  // 重新分配ID，保持连续性
  const newData = selectedData.map((item, index) => ({
    ...item,
    id: index + 1,
  }))

  setTimeout(() => {
    loading.value = false
    data.value = newData
  }, 1000)
}
getNewDataset()
</script>
