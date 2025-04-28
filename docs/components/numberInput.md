# NumberInput数字输入框

## 基础用法 
:::demo numberInput/basic
:::

## 尺寸
> 通过 `size` 来设置尺寸大小 可选值有 `xs` `sm` `md` `lg` `xl`
:::demo numberInput/size
:::

## 占位符文本
> 通过 `placeholder` 来设置默认占位符

## 禁用状态
:::demo numberInput/disable
:::

## 最值
> 通过 `min` 和 `max` 来分别设置最小和最大值


## color颜色
> 通过 `color` 来设置颜色
>>
> 可选值  `ghost`, `daisyui通用颜色`

:::demo numberInput/color
:::

## API

### Attributes

|   属性值    |   说明   |  类型   |         具体类型/示范          | 默认值 |
| :---------: | :------: | :-----: | :----------------------------: | :----: |
|    size     |   尺寸   |  enum   |   ['xs','sm','md','lg','xl']   |  'md'  |
| placeholder |  占位符  | string  |           请输入文本           |   -    |
|  disabled   | 是否禁用 | boolean |              true              | false  |
|     min     |  最小值  | number  |               30               |   -    |
|     max     |  最大值  | number  |              100               |   -    |
|    color    |   颜色   | number  | ['ghost',...'daisyui通用颜色'] |   -    |

### Event

> none

### Slots

> none