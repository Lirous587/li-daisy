# ThemeSwitch主题切换器

## 默认主题
> 组件库默认主题名为 `li-light` 和 `li-dark` 两种模式

:::demo themeSwitch/default
:::

## 自定义
> 通过传递 `lightTheme` 和 `darkTheme` 来分别设置明暗模式
>>
> 若需额外自行定义可参考[daisyui文档](https://daisyui.com/docs/themes/)
>>
> 需要使用时仅仅需要分别传递定义好的明暗模式的 `name` 即可

:::demo themeSwitch/custom
:::

## API

### Attributes
|   属性值   |   说明   |   类型   |   默认值   |
| :--------: | :------: | :------: | :--------: |
| lightTheme | 明亮主题 | `string` | `li-light` |
| darkTheme  | 暗黑主题 | `string` | `li-dark`  |