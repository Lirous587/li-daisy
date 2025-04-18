# Drawer抽屉

## 基础用法
> 通过title设置抽屉的标题
>>
> 通过size设置宽度大小，其值可为任意有效css宽度传函数 `calc()`，`min()`，`max()`，`clamp()` 也是可以的，默认值为 `max(300px, 40%)`
>>
>  direction可选值有 `ltr` `rtl`，默认值为 `ltr`
>

:::demo drawer/basic
:::

## 显示关闭图标

通过设置show-close-icon来控制是否显示图标，默认值为 `false`

:::demo drawer/icon
:::


## 点击蒙层关闭

通过设置 `close-on-click-modal` 来控制点击图层是否关闭，默认值为 `true`


> [!IMPORTANT]
> 当设置了 `close-on-click-modal` 为true时，关闭图标不再受控制，必然显示

:::demo drawer/modal
:::

## API

> none

### Attributes

#### Drawer

|        属性值        |              说明              |  类型   |         具体类型/示范         |      默认值       |
| :------------------: | :----------------------------: | :-----: | :---------------------------: | :---------------: |
|        title         |            抽屉标题            | string  |           Li-Daisy            |         -         |
|         size         | 抽屉大小/支持任意的css宽度大小 | string  | "40%","800px",max(300px, 40%) | 'max(300px, 40%)' |
|      direction       |            打开方向            |  enum   |         ['ltr','rtl']         |       'ltr'       |
|   show-close-icon    |        是否现在关闭图标        | boolean |             false             |       false       |
| close-on-click-modal |      点击蒙层是否关闭抽屉      | boolean |             true              |       true        |

### Event

> none

### Slots

#### Drawer

| 插槽名  |     说明     |
| :-----: | :----------: |
| default | 填充抽屉内容 |

### Expose
| 方法名 |     说明     |
| :----: | :----------: |
|  open  | 控制抽屉打开 |
| close  | 控制抽屉关闭 |