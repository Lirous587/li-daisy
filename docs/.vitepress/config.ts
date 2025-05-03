import { defineConfig } from 'vitepress'
import tailwindcssPlugin from '@tailwindcss/postcss'
import { postcssIsolateStyles } from 'vitepress'

import { demoBlockPlugin } from './plugins/demo'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Li-Daisy',
  description: 'Li-Daisy组件库文档',
  head: [['link', { rel: 'icon', href: '/favicon.ico' }]],
  lang: 'zh',

  themeConfig: {
    search: {
      provider: 'local',
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '主页', link: '/' },
      { text: '组件列表', link: '/components/overview' },
    ],

    sidebar: [
      {
        text: '总览',
        items: [{ text: '组件列表', link: '/components/overview' }],
      },
      {
        text: '布局 (Layout)',
        items: [
          { text: 'Collapse', link: '/components/collapse' },
          { text: 'Drawer', link: '/components/drawer' },
          { text: 'Menu(待完善)', link: '#' },
        ],
      },
      {
        text: '数据输入 (Data Entry)',
        items: [
          { text: 'TextInput', link: '/components/textInput' },
          { text: 'Textarea', link: '/components/textarea' },
          { text: 'NumberInput', link: '/components/numberInput' },
          { text: 'Select(待完善)', link: '#' },
          { text: 'Form', link: '/components/form' },
        ],
      },
      {
        text: '数据展示 (Data Display)',
        items: [
          { text: 'Avatar', link: '/components/avatar' },
          { text: 'Table', link: '/components/table' },
          { text: 'Paging', link: '/components/paging' },
        ],
      },
      {
        text: '反馈 (Feedback)',
        items: [
          { text: 'Modal', link: '/components/modal' },
          { text: 'Toast', link: '/components/toast' },
          { text: 'Skeleton', link: '/components/skeleton' },
        ],
      },
      {
        text: '主题 (Theme)',
        items: [{ text: 'ThemeController', link: '/components/themeController' }],
      },
    ],

    // 启用最后更新时间
    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'medium',
        timeStyle: 'medium',
      },
    },

    outline: {
      level: 'deep',
      label: '导航',
    },

    socialLinks: [{ icon: 'github', link: 'https://github.com/Lirous587/Li-Daisy' }],
  },

  markdown: {
    config: (md) => {
      md.use(demoBlockPlugin)
    },
  },

  vite: {
    css: {
      postcss: {
        plugins: [tailwindcssPlugin(), postcssIsolateStyles({})],
      },
    },
  },
})
