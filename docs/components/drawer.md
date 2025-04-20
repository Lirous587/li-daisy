# Drawer抽屉

## 基础用法
> 通过title设置抽屉的标题

:::demo drawer/basic
:::

## 打开方向 
>  direction可选值有 `ltr` `rtl`，默认值为 `ltr`

:::demo drawer/direction
:::

## 设置大小/支持响应式
> 通过size设置宽度大小，支持 Tailwind CSS 的任意宽度值（包括响应式写法）
> >
> 默认值为 `w-[40vw] min-w-[250px]` 


:::demo drawer/size
:::

## 显示关闭图标

>通过设置 `show-close-icon` 来控制是否显示图标，默认值为 `false`

:::demo drawer/icon
:::


## 点击蒙层关闭
>通过设置 `close-on-click-modal` 来控制点击图层是否关闭，默认值为 `true`


> [!IMPORTANT]
> 当设置了 `close-on-click-modal` 为true时，关闭图标不再受控制，必然显示

:::demo drawer/modal
:::


## ConfirmDrawer
:::demo drawer/confirm
:::


## API

### Attributes

#### Drawer

|      属性值       |         说明         |  类型   |      具体类型/示范      |          默认值          |
| :---------------: | :------------------: | :-----: | :---------------------: | :----------------------: |
|       title       |       抽屉标题       | string  |        Li-Daisy         |            -             |
|       size        |       抽屉大小       | string  | 'w-screen max-w-[80vw]' | 'w-[40vw] min-w-[250px]' |
|     direction     |       打开方向       |  enum   |      ['ltr','rtl']      |          'ltr'           |
|   showCloseIcon   |   是否现在关闭图标   | boolean |          false          |          false           |
| closeOnClickModal | 点击蒙层是否关闭抽屉 | boolean |          true           |           true           |

### Event

> none

### Slots

#### Drawer

| 插槽名  |     说明     |
| :-----: | :----------: |
| default | 填充抽屉内容 |

### Expose
| 方法名 |     说明     |   类型   | 具体类型/示范 |
| :----: | :----------: | :------: | :-----------: |
|  open  | 控制抽屉打开 | Function |  () => void   |
| close  | 控制抽屉关闭 | Function |  () => void   |