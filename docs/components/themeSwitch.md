# ThemeSwitch主题切换器

## 默认主题

> 组件库默认主题名为 `li-light` 和 `li-dark` 两种模式

:::demo themeSwitch/default
:::

## 自定义

> 通过传递 `lightTheme` 和 `darkTheme` 来分别设置明暗模式
>
> 若需额外自行定义可参考[daisyui文档](https://daisyui.com/docs/themes/)
>
> 需要使用时仅仅需要分别传递定义好的明暗模式的 `name` 即可

## 服务端渲染注意事项

:::warning
由于组件内部使用 `localStorage` 进行主题持久化，而在服务端环境无 `localStorage`，因此在 SSR 应用中会产生**水合不一致**的问题。

当用户设置为 `dark` 模式并刷新页面时会产生严重的**闪屏现象**。

这一现象与网速无关，主要原因是：服务端渲染时用户先看见不含 `data-theme` 和 `class="dark"` 的页面，而下一刻客户端激活后立即添加了这些属性，导致页面样式突然变化。

为了避免此问题，需要在页面渲染前同步设置主题。
:::

### 解决方案

在 `<head>` 中添加内联脚本，确保在页面内容渲染前执行

#### Astro 项目

```astro
<!-- 在 layout.astro 或页面文件的 <head> 中添加 -->
<script is:inline>
  (function () {
    try {
      // 同步读取并应用主题
      const theme =
        localStorage.getItem("li-daisy-theme") ||
        (window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "li-dark"
          : "li-light");

      document.documentElement.setAttribute("data-theme", theme);

      if (theme === "li-dark") {
        document.documentElement.classList.add("dark");
      }
    } catch (e) {
      // 降级处理
      document.documentElement.setAttribute("data-theme", "li-light");
    }
  })();
</script>
```

#### Nuxt.js 项目

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  app: {
    head: {
      script: [
        {
          innerHTML: `
            (function () {
              try {
                const theme = localStorage.getItem("li-daisy-theme") || 
                  (window.matchMedia("(prefers-color-scheme: dark)").matches ? "li-dark" : "li-light");
                document.documentElement.setAttribute("data-theme", theme);
                if (theme === "li-dark") {
                  document.documentElement.classList.add("dark");
                }
              } catch (e) {
                document.documentElement.setAttribute("data-theme", "li-light");
              }
            })();
          `,
        },
      ],
    },
  },
})
```

:::tip

1. 脚本必须放在 `<head>` 中，在页面内容渲染前执行
2. 不能使用 `async` 或 `defer`，必须同步阻塞执行
3. 确保脚本中的主题名称与组件配置
   :::

## API

### Attributes

|   属性值   |   说明   |   类型   |   默认值   |
| :--------: | :------: | :------: | :--------: |
| lightTheme | 明亮主题 | `string` | `li-light` |
| darkTheme  | 暗黑主题 | `string` | `li-dark`  |

### Event

|  名称  |     说明     |      类型      |                  |
| :----: | :----------: | :------------: | ---------------- |
| toggle | 修改模式回调 | `(mode:'light' | 'dark') => void` |

### Expose

|  方法名  |      说明      |   类型    |
| :------: | :------------: | :-------: |
| nowTheme |    当前主题    | `string`  |
|  isDark  | 是否为黑暗模式 | `boolean` |
