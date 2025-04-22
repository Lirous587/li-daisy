# Input输入框

## 基本使用 
:::demo input/basic
:::

## 尺寸
> 通过 `size` 来设置尺寸大小 可选值有 `xs` `sm` `md` `lg` `xl`
:::demo input/size
:::

## 占位符文本
> 通过 `placeholder` 来设置默认占位符

## 禁用状态
:::demo input/disable
:::


## 输入类型
>为了更好的浏览器补全，支持以下类型
>>
> `text`， `password`， `email`， `url`， `tel`， `search`
:::demo input/type
:::



## 最大长度
> 通过 `maxlength` 来设置最大文本长度，

## 样式

## API

### Attributes

|   属性值    |     说明     |  类型   |       具体类型/示范        | 默认值 |
| :---------: | :----------: | :-----: | :------------------------: | :----: |
|    type     |     类型     |  enum   |       浏览器原生属性       | 'text' |
|    size     |     尺寸     |  enum   | ['xs','sm','md','lg','xl'] |  'md'  |
| placeholder |    占位符    | string  |         请输入文本         |   -    |
|  disabled   |   是否禁用   | boolean |            true            | false  |
|  maxlength  | 最大文本长度 | number  |             30             |   -    |



### Event

> none

### Slots

#### Skeleton

| 插槽名  |       说明       |
| :-----: | :--------------: |
| content | 实际要渲染的内容 |