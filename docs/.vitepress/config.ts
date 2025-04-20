import { defineConfig } from 'vitepress'
import tailwindcssPlugin from '@tailwindcss/postcss'
import { postcssIsolateStyles } from 'vitepress'

import { demoBlockPlugin } from './plugins/demo'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Li-Daisy组件库',
  description: 'Li-Daisy组件库文档',
  head: [['link', { rel: 'icon', href: 'https://lirous.com/favicon.ico' }]],

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '主页', link: '/' },
      { text: '组件列表', link: '/components/overview' },
    ],

    sidebar: [
      {
        text: '组件列表',
        items: [
          { text: '总览', link: '/components/overview' },
          { text: 'Avatar头像', link: '/components/avatar' },
          { text: 'Collapse折叠面板', link: '/components/collapse' },
          { text: 'Drawer抽屉', link: '/components/drawer' },
          { text: 'Modal对话框', link: '/components/modal' },
          { text: 'ThemeController主题控制器', link: '/components/themeController' },
        ],
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
