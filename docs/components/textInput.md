# TextInput文本输入框
> 用于输入单行文本数据

## 尺寸

> 通过 `size` 来设置尺寸大小 可选值有 `xs` `sm` `md` `lg` `xl`
:::demo textInput/size
:::


## color颜色
> 通过 `color` 来设置颜色
>
> 可选值 `[base,neutral,primary,secondary,accent,info,success,warning,error] `
:::demo textInput/color
:::

## 使用插槽
> 通过 `prefix` 和 `suffix` 来设置前后插槽
:::demo textInput/slot
:::


## 最大长度
> 通过 `maxlength` 来设置最大文本长度
:::demo textInput/maxlength
:::


## 禁用状态
> 通过 `disable` 来设置禁用状态 
:::demo textInput/disable
:::

## 输入类型
> 为了更好的浏览器补全，支持以下类型：
>
> `TextInput` 上可用于任何**文本类型**
> 
> 如 `text`、`password`、`email`、`number`、`tel`、`url`、`search`
:::demo textInput/type
:::

## API

### Attributes

|    属性值    |     说明     |       类型       |  默认值  |
| :----------: | :----------: | :--------------: | :------: |
|     type     |     类型     | `TextInputType`  | `'text'` |
|     size     |     尺寸     | `TextInputSize`  |  `'md'`  |
| placeholder  |    占位符    |     `string`     |    -     |
|   disabled   |   是否禁用   |    `boolean`     | `false`  |
|  maxlength   | 最大文本长度 |     `number`     |    -     |
|    color     |     颜色     | `TextInputColor` |  `base`  |
| autocomplete | 是否自动补全 |    `boolean`     | `false`  |


### Slots

| 插槽名 |   说明   |
| :----: | :------: |
| prefix | 前缀插槽 |
| suffix | 后缀插槽 |
