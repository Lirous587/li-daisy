# Modal对话框
> 用于需要用户响应的操作或信息展示

## 打开方式

> 支持两种打开方式 使用 **trigger插槽** 或 **ModalRef**
> 
> 使用 **trigger插槽** 时点击即可自动打开抽屉
> 
> 使用 **ModalRef** 时需自行调用 `open` 方法

:::demo modal/method
:::

## 打开方向 
>  direction可选值有 `ltr` `rtl` `middle` `ttb` `btt`，默认值为 无打开方向居中显示

:::demo modal/direction
:::

## 设置大小/支持响应式
:::warning 注意
该本质是绑定到Modal上的动态css，所有使用的要尤其小心，避免造成副作用
:::
> 通过size设置宽度大小，支持 Tailwind CSS 的任意宽度值（包括响应式写法）
>>
> 不设置方向时，即居中显示时：modal默认设置了 `max-width` 为 `512px` 
>>
> 当direction为 `ttb` 或 `btt` 要设置对应的 `height` `max-height`
>>
> 当direction为 `ltr` 或 `rtl` 要设置对应的 `width` `max-width`
>>
> 自行定义的时候要修改 `width`  `max-width` 或 `heigth` `max-heigth`

:::demo modal/size
:::

## 显示关闭图标
>通过设置 `show-close-icon` 来控制是否显示图标，默认值为 `true`

:::demo modal/icon
:::


## 点击蒙层关闭

>通过设置 `close-on-click-modal` 来控制点击图层是否关闭，默认值为 `true`


> [!IMPORTANT]
> 当设置了 `close-on-click-modal` 为true时，关闭图标不再受控制，必然显示


:::demo modal/modal
:::

## emit
:::demo modal/emit
:::


## 自定义header
可使用 `header` 插槽自定义抽屉头部，并且该插槽暴露一个 `close` 方法用于关闭抽屉
> [!IMPORTANT]
> 由于自定义了header，由此此时 `show-close-icon` 将不再有实际作用
>> 
> 同理，若将 `close-on-click-modal` 设置为 `false`，请务必确保留有关闭的按钮或图标等，以此确保用户体验

:::demo modal/header
:::


## 关闭时注销组件
`destroy-on-close` 属性决定关闭 `modal` 时是否卸载组件，默认为 `false`

> 需要每次打开弹窗都初始化内容时，建议设置 `destroy-on-close` 为 `true`
> 
> 需要保留弹窗内表单、计数器等状态时，建议保持默认（`false`）
> 
> 效果类似于 [keep-alive](https://cn.vuejs.org/guide/built-ins/keep-alive.html#basic-usage)
:::demo modal/destory
:::



## API

### Attributes
|        属性值        |          说明          |   类型    |          默认值           |
| :------------------: | :--------------------: | :-------: | :-----------------------: |
|         size         |        抽屉大小        | `string`  | `'w-11/12 max-w-[512px]'` |
|   show-close-icon    |    是否显示关闭图标    | `boolean` |          `true`           |
| close-on-click-modal |  点击蒙层是否关闭抽屉  | `boolean` |          `true`           |
|   destroy-on-close   | 关闭组件时是否卸载组件 | `boolean` |          `false`          |



### Slots
| 插槽名  |       说明       |
| :-----: | :--------------: |
| trigger | 打开对话框触发器 |
| header  |    对话框头部    |
|  body   |    对话框内容    |


### Event
| 名称  |     说明      |     类型     |
| :---: | :-----------: | :----------: |
| open  | 打开modal回调 | `() => void` |
| close | 关闭modal回调 | `() => void` |


### Expose
| 方法名 |     说明     |     类型     |
| :----: | :----------: | :----------: |
|  open  | 控制抽屉打开 | `() => void` |
| close  | 控制抽屉关闭 | `() => void` |
