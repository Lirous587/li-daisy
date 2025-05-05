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
        text: '开始',
        items: [{ text: '组件列表', link: '/components/overview' }],
      },
      {
        text: '布局 (Layout)',
        items: [
          { text: 'Collapse 折叠面板', link: '/components/collapse' },
          { text: 'Drawer 抽屉', link: '/components/drawer' },
        ],
      },
      {
        text: '数据输入 (Data Entry)',
        items: [
          { text: 'TextInput 文本输入框', link: '/components/textInput' },
          { text: 'Textarea 多行文本输入框', link: '/components/textarea' },
          { text: 'NumberInput 数字输入框', link: '/components/numberInput' },
          { text: 'Form 表单', link: '/components/form' },
        ],
      },
      {
        text: '数据展示 (Data Display)',
        items: [
          { text: 'Avatar 头像', link: '/components/avatar' },
          { text: 'Table 表格', link: '/components/table' },
          { text: 'Paging 分页', link: '/components/paging' },
        ],
      },
      {
        text: '反馈 (Feedback)',
        items: [
          { text: 'Modal 对话框', link: '/components/modal' },
          { text: 'Toast 消息提示', link: '/components/toast' },
          { text: 'Skeleton 骨架屏', link: '/components/skeleton' },
        ],
      },
      {
        text: '主题 (Theme)',
        items: [{ text: 'ThemeController 主题控制器', link: '/components/themeController' }],
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
