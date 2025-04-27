# Toast消息提示

## 基础用法 
:::demo toast/basic
:::

## 组件用法 
:::demo toast/component
:::

> 以下演示均为**函数式**用法

## 类型
> 通过 `type` 来设置消息类型，可选值有 `info` `success` `warning` `error`

:::demo toast/type
:::


## 位置
> 通过 `position` 来设置消息位置，可选值有 `top-start` `top-center` `top-end` `bottom-start` `bottom-end`

:::demo toast/position
:::


## API

### Attributes
|  属性值   |       说明       |  类型   |                          具体类型/示范                           |  默认值   |
| :-------: | :--------------: | :-----: | :--------------------------------------------------------------: | :-------: |
|   type    |     消息类型     |  enum   |               ['info','success','warning','error']               |  'info'   |
| position  |     消息位置     |  enum   | ['top-start','top-center','top-end','bottom-start','bottom-end'] | 'top-end' |
| duration  | 消息显示时间/ms  |  enum   |                               3000                               |   2000    |
| showClose | 是否显示关闭图标 | boolean |                               true                               |   false   |

### Event

> none

### Slots
| 插槽名  |   说明   |
| :-----: | :------: |
| default | 默认插槽 |


