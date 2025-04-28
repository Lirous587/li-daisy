# Toast消息提示

## 基础用法 
:::demo toast/basic
:::

## 组件用法 
:::demo toast/component
:::

> 以下演示均为**函数式**用法

## 类型
> 通过 `type` 来设置消息类型，可选值有 `info` `success` `warning` `error` `custom`
>> 
> custom 不再有默认图标，支持高度自定义
:::demo toast/type
:::

### custom类型
:::demo toast/custom
:::



## 位置
> 通过 `position` 来设置消息位置，可选值有 `top-start` `top-center` `top-end` `bottom-start` `bottom-end`

:::demo toast/position
:::

## 关闭图标
> 通过 `showClose` 来设置是否显示图标，默认值为 `true`

## API

### Attributes
|  属性值   |       说明       |  类型   |                          具体类型/示范                           |  默认值   |
| :-------: | :--------------: | :-----: | :--------------------------------------------------------------: | :-------: |
|   type    |     消息类型     |  enum   |          ['info','success','warning','error','custom']           |  'info'   |
| position  |     消息位置     |  enum   | ['top-start','top-center','top-end','bottom-start','bottom-end'] | 'top-end' |
| duration  | 消息显示时间/ms  |  enum   |                               3000                               |   2000    |
| showClose | 是否显示关闭图标 | boolean |                               true                               |   false   |

### Event

> none

### Slots
| 插槽名  |   说明   |
| :-----: | :------: |
| default | 默认插槽 |


