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
          { text: 'Queue 队列', link: '/components/queue' },
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
          { text: 'Notification 通知', link: '/components/notification' },
          { text: 'Message 消息条', link: '/components/message' },
          { text: 'Skeleton 骨架屏', link: '/components/skeleton' },
          { text: 'Popover 弹出框', link: '/components/popover' },
          { text: 'Popconfirm 气泡确定框', link: '/components/popconfirm' },
        ],
      },
      {
        text: '主题 (Theme)',
        items: [{ text: 'ThemeSwitch 主题切换器', link: '/components/themeSwitch' }],
      },

      {
        text: '内置指令',
        items: [{ text: 'v-loading 加载', link: '/components/loading' }],
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
        plugins: [
          tailwindcssPlugin(),
          postcssIsolateStyles({
            includeFiles: [/vp-doc\.css/, /base\.css/],
          }),
        ],
      },
    },
  },
})
