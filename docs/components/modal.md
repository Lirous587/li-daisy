# Modal对话框

> Modal的用法大致和Drawer一致

## 基础用法
:::demo modal/basic
:::

## 打开方向 
>  direction可选值有 `ltr` `rtl` `ttb` `btt`，默认值为 无打开方向居中显示

:::demo modal/direction
:::

## 设置大小/支持响应式
> 通过size设置宽度大小，支持 Tailwind CSS 的任意宽度值（包括响应式写法）
>>
> 不设置方向时，即居中显示时：modal默认设置了 `max-width` 为 `512px` 
>> 
> 当direction为 `ttb` 或 `btt` 其 `width` 为 `100vw`
>>
> 当direction为 `ltr` 或 `rtl` 其 `height` 为 `100vh`
>>  
>
> 当direction为 `ttb` 或 `btt` 要请设置对应的 `height` `max-height`
>>
> 当direction为 `ltr` 或 `rtl` 则要设置对应的 `width` `max-width`
>>
> 自行定义的时候要修改 `width`  `max-width` 或 `heigth` `max-heigth`

:::demo modal/size
:::


## 显示关闭图标
>通过设置 `close-icon` 来控制是否显示图标，默认值为 `false`

:::demo modal/icon
:::


## 点击蒙层关闭

>通过设置 `close-on-click-modal` 来控制点击图层是否关闭，默认值为 `true`


> [!IMPORTANT]
> 当设置了 `close-on-click-modal` 为true时，关闭图标不再受控制，必然显示


:::demo modal/modal
:::



## API

### Attributes
|        属性值        |         说明         |   类型    | 具体类型 |          默认值           |
| :------------------: | :------------------: | :-------: | :------: | :-----------------------: |
|         size         |       抽屉大小       | `string`  |    -     | `'w-11/12 max-w-[512px]'` |
|      close-icon      |   是否显示关闭图标   | `boolean` |    -     |          `false`          |
| close-on-click-modal | 点击蒙层是否关闭抽屉 | `boolean` |    -     |          `true`           |


### Slots
| 插槽名  |      说明      |
| :-----: | :------------: |
| default | 填充对话框内容 |

### Expose
| 方法名 |     说明     |    类型    |   具体类型   |
| :----: | :----------: | :--------: | :----------: |
|  open  | 控制抽屉打开 | `Function` | `() => void` |
| close  | 控制抽屉关闭 | `Function` | `() => void` |
