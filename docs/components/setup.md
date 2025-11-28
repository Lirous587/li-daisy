# 快速开始

## 设计理念

`li-daisy` 遵循 Tailwind CSS 4 “源码即配置” 的现代理念，致力于实现**零冲突、最小体积、主题一致**的 Vue 3 组件体验：

- **零冲突**：所有通用类（如 `.flex`、`.btn` 等）都由宿主项目的 Tailwind 编译器统一生成，确保样式版本完全一致，彻底避免样式冲突和重复。
- **最小体积**：组件库自身只包含必要的主题变量和极少量自定义样式，绝不重复打包 Tailwind 或 DaisyUI 的基础样式，让你的最终 CSS 体积最小化。
- **主题一致**：`li-daisy` 组件会自动适配你项目中的 DaisyUI 配置（如主题、色板、圆角等），保证组件风格与全局一致。

这种设计方式让组件库与项目深度融合，既能享受 DaisyUI 丰富的组件样式，又能保持极致的灵活性和可维护性。



## 环境要求

- Node.js 18+
- Vue 3.3+
- Tailwind CSS 4+
- DaisyUI 5+


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

在项目中创建全局样式文件（例如 `src/assets/css/global.css`），并填入以下内容：

```css
/* 引入 Tailwind CSS 核心 */
@import 'tailwindcss';

/* 启用并配置 daisyUI 插件 */
@plugin "daisyui" {
  prefix: ''; /* [关键] 必须留空，以确保样式匹配 */
}

/* 
  [关键] 扫描 li-daisy 的文件，
  以便 Tailwind 能为它的组件生成样式
  这是实现0额外css开销的关键
*/
@source "../../../node_modules/li-daisy/dist/**/*.{js,vue}";


/* 自定义深色模式变体 */
@custom-variant dark (&:where(.dark, .dark *));
```

::: tip 配置详解
这段配置是 `li-daisy` 与你的项目无缝集成的核心，每一条指令都至关重要：

- **`@plugin "daisyui"`**: 启用 daisyUI。
  - `prefix: ''`: **此项必须为空**。因为 `li-daisy` 组件内部使用标准的 daisyUI 类名（如 `btn`）。如果你设置了前缀（例如 `daisy-`），你的项目会生成 `.daisy-btn`，而组件依然请求 `.btn`，这将导致样式完全失效。

- **`@source`**: 这是 Tailwind 4 的核心指令，用于按需生成样式。
  - `../../../node_modules/li-daisy/...`: **此行必须存在**。它会扫描 `li-daisy` 的文件，确保其内部使用的 `btn`, `modal` 等类能被你的项目正确编译。**如果缺少此行，所有 `li-daisy` 组件都将没有样式。**

- **`@custom-variant dark`**: 为深色模式定义一个自定义变体，确保主题切换功能正常工作。
:::


## 引入样式

在 `main.ts` 中引入必要的样式文件:

```typescript
import { createApp } from 'vue'
import App from './App.vue'

// 引入全局样式
import './assets/css/global.css' // 你配置的 CSS 文件路径
// 引入li-daisy 组件样式
import 'li-daisy/style.css'  

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
import 'li-daisy/style.css'

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