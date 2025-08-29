# Drawer抽屉

## 打开方式
> 支持两种打开方式 使用 **default插槽** 或 **drawerRef** 
> 使用 **default插槽** 时点击即可自动打开抽屉
> 使用 **drawerRef** 时需自行调用 `open` 方法

:::demo drawer/method
:::

## 打开方向 
>  direction可选值有 `ltr` `rtl`，默认值为 `ltr`

:::demo drawer/direction
:::

## 设置大小/支持响应式
> 通过size设置宽度大小，支持 Tailwind CSS 的任意宽度值（包括响应式写法）
> >
> 默认值为 `w-[40vw] min-w-[250px]` 

:::warning 注意
该本质是绑定到drawer上的动态css，所有使用的要尤其小心，避免造成副作用
:::

:::demo drawer/size
:::

## 显示关闭图标

>通过设置 `show-close-icon` 来控制是否显示图标，默认值为 `true`

:::demo drawer/icon
:::


## 点击蒙层关闭
>通过设置 `close-on-click-modal` 来控制点击图层是否关闭，默认值为 `true`


> [!IMPORTANT]
> 当设置了 `close-on-click-modal` 为true时，关闭图标不再受控制，必然显示

:::demo drawer/modal
:::


## API

### Attributes

#### Drawer
|        属性值        |         说明         |      类型       |           默认值           |
| :------------------: | :------------------: | :-------------: | :------------------------: |
|        title         |       抽屉标题       |    `string`     |             -              |
|         size         |       抽屉大小       |    `string`     | `'w-[40vw] min-w-[250px]'` |
|      direction       |       打开方向       | `['ltr','rtl']` |          `'ltr'`           |
|   show-close-icon    |   是否显示关闭图标   |    `boolean`    |           `true`           |
| close-on-click-modal | 点击蒙层是否关闭抽屉 |    `boolean`    |           `true`           |

### Slots

#### Drawer
| 插槽名  |     说明     |
| :-----: | :----------: |
| default | 填充抽屉内容 |

### Expose
| 方法名 |     说明     |      类型      |
| :----: | :----------: | :------------: |
| status | 抽屉打开状态 | `Ref<boolean>` |
|  open  | 控制抽屉打开 |  `() => void`  |
| close  | 控制抽屉关闭 |  `() => void`  |