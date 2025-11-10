# 快速开始

## 环境要求

- Node.js 18+ 
- Vue 3.3+

## 包管理器安装

使用你喜欢的包管理器安装 `li-daisy`:

::: code-group

```bash [pnpm]
pnpm add li-daisy
```

```bash [yarn]
yarn add li-daisy
```

```bash [bun]
bun add li-daisy
```

```bash [npm]
npm install li-daisy
```
:::

## 前置操作

> `li-daisy` 基于 [daisyUI](https://daisyui.com/) 构建，需要在项目中配置 daisyUI 和 Tailwind CSS

您需要先安装 [Tailwind CSS](https://tailwindcss.com/docs/installation/using-vite) 和 [daisyUI](https://daisyui.com/docs/install/)

### CSS 配置

在项目中创建全局样式文件（例如 `src/assets/css/global.css` 或任意你喜欢的名字）:

```css
/* 引入 Tailwind CSS */
@import 'tailwindcss';

/* 配置 daisyUI 插件 */
@plugin "daisyui" {
  prefix: ''; /* 类名前缀，建议留空 */
}

/* 深色模式变体 */
@custom-variant dark (&:where(.dark, .dark *));
```

**配置说明**:

- **`prefix`**: daisyUI 类名前缀
  - 留空: 使用原生类名 `btn`、`card`（推荐）
  - 设置前缀: 如 `my-` 会变成 `my-btn`、`my-card`

- **`@custom-variant dark`**: 自定义深色模式选择器，确保在 `.dark` 类下样式正确应用

::: tip 推荐配置
建议将 `prefix` 保持为空，这样可以直接使用 daisyUI 的原生类名，代码更简洁易读

只有在确实存在类名冲突时才考虑添加前缀

若添加前缀，请避免使用 `li-` 作为前缀，这有可能导致潜在的样式冲突
:::

## 引入样式

在 `main.ts` 中引入必要的样式文件:

```typescript
import { createApp } from 'vue'
import App from './App.vue'

// 引入全局样式
import './assets/css/global.css' // 你配置的 CSS 文件路径
import 'li-daisy/dist/style.css'  // li-daisy 组件样式

const app = createApp(App)
app.mount('#app')
```

## 注册指令（可选）

如果需要使用 `v-loading` 指令，在 `main.ts` 中注册:

```typescript
import { createApp } from 'vue'
import App from './App.vue'
import { loadingDirective } from 'li-daisy'

import './assets/css/global.css'
import 'li-daisy/dist/style.css'

const app = createApp(App)

// 注册 loading 指令（可自定义名称）
app.directive('loading', loadingDirective)

app.mount('#app')
```

## 开始使用

现在你可以在项目中使用 `li-daisy` 的组件了:

::: demo skeleton/mask
:::

::: tip 按需引入
`li-daisy` 支持按需引入，无需额外配置。直接导入需要的组件即可，打包工具会自动进行 tree-shaking。
:::