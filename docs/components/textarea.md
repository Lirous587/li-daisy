# Textarea多行文本输入框

## 尺寸

> 通过 `size` 来设置尺寸大小 可选值有 `xs` `sm` `md` `lg` `xl`，默认值是 `md`
>
> 与 `daisyui` 不同的是此处尺寸不会影响 `textarea` 这一元素的高度,影响的是 `textarea` 内字体大小属性
> :::demo textarea/size
> :::

## 禁用状态

:::demo textarea/disable
:::

## 最大长度

> 通过 `maxlength` 来设置最大文本长度

## 设置行数

> 通过 `min-rows` `max-rows` 来分别设置最小和最大行数
>
> 行数超出 `max-rows` 时将显示滚动条
> :::demo textarea/rows
> :::

## color颜色

> 通过 `color` 来设置颜色
>
> 可选值 `[base,neutral,primary,secondary,accent,info,success,warning,error] `

:::demo textarea/color
:::

## API

### Attributes

|   属性值    |     说明     |      类型       | 默认值  |
| :---------: | :----------: | :-------------: | :-----: |
|    size     |     尺寸     | `TextareaSize`  | `'sm'`  |
| placeholder |    占位符    |    `string`     |    -    |
|  disabled   |   是否禁用   |    `boolean`    | `false` |
|  maxlength  | 最大文本长度 |    `number`     |    -    |
|    color    |     颜色     | `TextareaColor` | `base`  |
