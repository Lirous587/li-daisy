# Popover弹出框

## 基础用法
> 通过 `trigger` 插槽和 `content` 插槽来定义触发器和弹出内容

:::demo popover/basic
:::

## 设置trigger
> 可选值有 `hover` 和 `click`，默认为 `hover`
:::demo popover/trigger
:::


## 设置位置
> 可选值有 `top`, `top-start`, `top-end`, `bottom`, `bottom-start`, `bottom-end`, `left`, `left-start`, `left-end`, `right`, `right-start`, `right-end`，默认为 `bottom`

:::demo popover/position
:::



## API

### Attributes


#### Props
|         属性值         |        说明        |   类型    |                                                               具体类型                                                                |  默认值  |
| :--------------------: | :----------------: | :-------: | :-----------------------------------------------------------------------------------------------------------------------------------: | :------: |
|        position        |      对齐位置      |  `enum`   | `['top','top-start','top-end','bottom','bottom-start','bottom-end','left','left-start','left-end','right','right-start','right-end']` | `bottom` |
|        trigger         |      触发时机      |  `enum`   |                                                          `['hover','click']`                                                          | `click`  |
|         offset         |    偏移距离(px)    | `number`  |                                                                   -                                                                   |   `8`    |
| close-on-click-outside | 点击外部关闭弹出框 | `boolean` |                                                                   -                                                                   |  `true`  |
|    close-on-escape     |   esc关闭弹出框    | `boolean` |                                                                   -                                                                   |  `true`  |
|        z-index         |     z-index值      | `number`  |                                                                   -                                                                   |   `0`    |



### Event
|  名称  |      说明      |           具体类型           |
| :----: | :------------: | :--------------------------: |
|  show  |  弹出框显示时  |         `() => void`         |
|  hide  |  弹出框隐藏时  |         `() => void`         |
| toggle | 弹出框状态切换 | `(visible: boolean) => void` |

### Expose
| 方法名  |      说明      |          类型          |
| :-----: | :------------: | :--------------------: |
|  show   |   显示弹出框   |      `() => void`      |
|  hide   |   隐藏弹出框   |      `() => void`      |
| toggle  | 切换弹出框状态 |      `() => void`      |
| visible |  弹出框状态值  | `ComputedRef<boolean>` |

### Slots
|  名称   |    说明    |
| :-----: | :--------: |
| trigger | 触发器内容 |
| content | 弹出框内容 |