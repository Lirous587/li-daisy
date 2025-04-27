# TextInput文本输入框

## 基础用法 
:::demo textInput/basic
:::

## 尺寸
> 通过 `size` 来设置尺寸大小 可选值有 `xs` `sm` `md` `lg` `xl`
:::demo textInput/size
:::

## 占位符文本
> 通过 `placeholder` 来设置默认占位符

## 禁用状态
:::demo textInput/disable
:::


## 输入类型
>为了更好的浏览器补全，支持以下类型
>>
> `text`， `password`， `email`， `url`， `tel`， `search`
:::demo textInput/type
:::

## 最大长度
> 通过 `maxlength` 来设置最大文本长度

## 使用插槽
> 通过 `prefix` 和 `suffix` 来设置前后插槽
:::demo textInput/slot
:::

## color颜色
> 通过 `color` 来设置颜色
>>
> 可选值  `ghost`, `daisyui通用颜色`

:::demo textInput/color
:::

## API

### Attributes

|   属性值    |     说明     |  类型   |         具体类型/示范          | 默认值 |
| :---------: | :----------: | :-----: | :----------------------------: | :----: |
|    type     |     类型     |  enum   |         浏览器原生属性         | 'text' |
|    size     |     尺寸     |  enum   |   ['xs','sm','md','lg','xl']   |  'md'  |
| placeholder |    占位符    | string  |           请输入文本           |   -    |
|  disabled   |   是否禁用   | boolean |              true              | false  |
|  maxlength  | 最大文本长度 | number  |               30               |   -    |
|    color    |     颜色     | number  | ['ghost',...'daisyui通用颜色'] |   -    |

### Event

> none

### Slots

| 插槽名 |   说明   |
| :----: | :------: |
| prefix | 前缀插槽 |
| suffix | 后缀插槽 |
