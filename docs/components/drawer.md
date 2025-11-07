# Drawer抽屉

## 打开方式

> 支持两种打开方式 使用 **trigger插槽** 或 **DrawerRef**
> 
> 使用 **trigger插槽** 时点击即可自动打开抽屉
> 
> 使用 **DrawerRef** 时需自行调用 `open` 方法

:::demo drawer/method
:::

## 打开方向

> direction可选值有 `ltr` `rtl`，默认值为 `ltr`

:::demo drawer/direction
:::

## 设置大小/支持响应式

> 通过size设置宽度大小，支持 Tailwind CSS 的任意宽度值（包括响应式写法）
>
> 默认值为 `w-[40vw] min-w-[250px]`

:::warning 注意
该本质是绑定到Drawer上的动态css，所有使用的要尤其小心，避免造成副作用
:::

:::demo drawer/size
:::

## 显示关闭图标

> 通过设置 `show-close-icon` 来控制是否显示图标，默认值为 `true`

:::demo drawer/icon
:::

## 点击蒙层关闭

> 通过设置 `close-on-click-modal` 来控制点击图层是否关闭，默认值为 `true`

> [!IMPORTANT]
> 当设置了 `close-on-click-modal` 为true时，关闭图标不再受控制，必然显示

:::demo drawer/modal
:::

## 自定义header

可使用 `header` 插槽自定义抽屉头部，并且该插槽暴露一个 `close` 方法用于关闭抽屉

> [!IMPORTANT]
> 由于自定义了header，由此此时 `show-close-icon` 将不再有实际作用
>
> 同理，若将 `close-on-click-modal` 设置为 `false`，请务必确保留有关闭的按钮或图标等，以此确保用户体验

:::demo drawer/header
:::

## API

### Attributes

#### Drawer

|        属性值        |          说明          |      类型       |           默认值           |
| :------------------: | :--------------------: | :-------------: | :------------------------: |
|        title         |        抽屉标题        |    `string`     |             -              |
|         size         |        抽屉大小        |    `string`     | `'w-[40vw] min-w-[250px]'` |
|      direction       |        打开方向        | `['ltr','rtl']` |          `'ltr'`           |
|   show-close-icon    |    是否显示关闭图标    |    `boolean`    |           `true`           |
| close-on-click-modal |  点击蒙层是否关闭抽屉  |    `boolean`    |           `true`           |
|   destroy-on-close   | 关闭组件时是否卸载组件 |    `boolean`    |          `false`           |

### Slots

| 插槽名  |      说明      |
| :-----: | :------------: |
| trigger | 打开抽屉触发器 |
| header  |    抽屉头部    |
|  body   |    抽屉主体    |

### Expose

| 方法名 |     说明     |     类型     |
| :----: | :----------: | :----------: |
|  open  | 控制抽屉打开 | `() => void` |
| close  | 控制抽屉关闭 | `() => void` |
