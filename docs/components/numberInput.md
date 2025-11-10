# NumberInput数字输入框
> 用于输入数字

## 尺寸

> 通过 `size` 来设置尺寸大小 可选值有 `xs` `sm` `md` `lg` `xl`
> :::demo numberInput/size
> :::

## 禁用状态

:::demo numberInput/disable
:::

## 最值

> 通过 `min` 和 `max` 来分别设置最小和最大值

## color颜色

> 通过 `color` 来设置颜色
>
> 可选值 `[base,neutral,primary,secondary,accent,info,success,warning,error] `

:::demo numberInput/color
:::

## API

### Attributes

|   属性值    |   说明   |        类型        | 默认值  |
| :---------: | :------: | :----------------: | :-----: |
|    size     |   尺寸   | `NumberInputSize`  | `'sm'`  |
| placeholder |  占位符  |      `string`      |    -    |
|  disabled   | 是否禁用 |     `boolean`      | `false` |
|     min     |  最小值  |      `number`      |    -    |
|     max     |  最大值  |      `number`      |    -    |
|    color    |   颜色   | `NumberInputColor` | `base`  |
