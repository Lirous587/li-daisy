import { defineConfig } from 'vitepress'
import tailwindcssPlugin from '@tailwindcss/postcss'
import { postcssIsolateStyles } from 'vitepress'

import { demoBlockPlugin } from './plugins/demo'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Li-Daisy',
  description: 'Li-Daisy组件库文档',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    //  注入一个 <style> 块，用于定义禁用过渡的工具类
    [
      'style',
      {},
      `
        /* 当这个类存在于 <html> 标签上时，所有元素的过渡效果都将被禁用 */
        html.disable-transitions * {
          transition: none !important;
        }
      `,
    ],
    [
      'script',
      {},
      `
        (function() {
          try {
            // 1. 定义遮罩样式 (使用伪元素实现，无需额外 DOM)
            const maskStyle = document.createElement('style');
            maskStyle.innerHTML = \`
              html.hydrating {
                overflow: hidden !important;
              }
              
              /* 全屏遮罩背景 */
              html.hydrating::before {
                content: '';
                position: fixed;
                z-index: 99999;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: var(--bg-color, #fff);
                transition: opacity 0.3s ease-out;
              }

              /* 加载转圈圈 */
              html.hydrating::after {
                content: '';
                position: fixed;
                z-index: 99999;
                top: 50%;
                left: 50%;
                width: 40px;
                height: 40px;
                margin: -20px 0 0 -20px;
                border: 4px solid var(--border-color, #e5e7eb);
                border-top-color: var(--primary-color, #3b82f6);
                border-radius: 50%;
                animation: spin 1s linear infinite;
              }

              @keyframes spin {
                to { transform: rotate(360deg); }
              }
            \`;
            document.head.appendChild(maskStyle);

            // 2. 检测主题并设置 CSS 变量供遮罩使用
            const theme = localStorage.getItem('li-daisy-theme') || 
              (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'li-dark' : 'li-light');
            
            // 设置主题颜色变量 (硬编码以匹配您的 daisyui 配置)
            const isDark = theme === 'li-dark';
            const bgColor = isDark ? 'oklch(25.33% 0.016 252.42)' : '#ffffff';
            const borderColor = isDark ? '#374151' : '#e5e7eb';
            const primaryColor = isDark ? 'oklch(58% 0.233 277.117)' : 'oklch(45% 0.24 277.023)';

            document.documentElement.style.setProperty('--bg-color', bgColor);
            document.documentElement.style.setProperty('--border-color', borderColor);
            document.documentElement.style.setProperty('--primary-color', primaryColor);

            // 3. 立即应用遮罩类
            document.documentElement.classList.add('hydrating');

            // 4. 常规主题设置
            document.documentElement.setAttribute('data-theme', theme);
            if (isDark) {
              document.documentElement.classList.add('dark');
            }
            
            const vpTheme = isDark ? 'dark' : 'auto';
            localStorage.setItem('vitepress-theme-appearance', vpTheme);

          } catch (e) {
            console.error('Theme initialization failed', e);
          }
        })();
      `,
    ],
  ],
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
        items: [
          { text: '快速开始', link: '/components/setup' },
          { text: '组件列表', link: '/components/overview' },
        ],
      },
      {
        text: '布局 (Layout)',
        items: [
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
    config: md => {
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
