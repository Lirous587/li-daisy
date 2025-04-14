import { defineConfig } from 'vitepress'
import tailwindcssPlugin from '@tailwindcss/postcss'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Li-Daisy组件库',
  description: 'Li-Daisy组件库文档',
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
        ],
      },
    ],

    socialLinks: [{ icon: 'github', link: 'https://github.com/Lirous587/Li-Daisy' }],
  },
  vite: {
    css: {
      postcss: {
        plugins: [tailwindcssPlugin()],
      },
    },
  },
})
