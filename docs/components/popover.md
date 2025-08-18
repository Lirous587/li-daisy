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

:::tip 智能定位
为了保证 **content** 插槽的内容尽量全部可见，Popover 组件会根据视口边界自动调整位置：

- **优先使用指定位置**：首先尝试在设定的 position 位置显示
- **自动避让边界**：当内容可能被视口边缘裁剪时，会自动切换到相反或相邻的位置
- **保持对齐关系**：调整后仍会尽量保持与触发器的对齐关系（如 `top-start` 可能调整为 `bottom-start`）
- **智能回退机制**：如果所有预设位置都无法完全显示，会选择显示区域最大的位置
- **唤起后不变性**：当弹出框显示后，位置会保持固定，不会因为滚动或窗口大小变化而重新计算位置，直到下次重新唤起时才会根据新的环境重新定位

例如：设置 `position="top"` 但上方空间不足时，会自动调整为 `bottom` 位置显示
>
下述示例中可以尝试滚动屏幕让 `top` 按钮处于当前屏幕较高位置，此时再去点击，悬浮框内容位置将变为 `bottom`
:::

:::demo popover/position
:::



## API

### Attributes


#### Props
|         属性值         |         说明         |   类型    |                                                               具体类型                                                                |  默认值  |
| :--------------------: | :------------------: | :-------: | :-----------------------------------------------------------------------------------------------------------------------------------: | :------: |
|        position        |       对齐位置       |  `enum`   | `['top','top-start','top-end','bottom','bottom-start','bottom-end','left','left-start','left-end','right','right-start','right-end']` | `bottom` |
|        trigger         |       触发时机       |  `enum`   |                                                          `['hover','click']`                                                          | `click`  |
|         offset         |     偏移距离(px)     | `number`  |                                                                   -                                                                   |   `6`    |
|        duration        | 弹出过渡动画持续时间 | `number`  |                                                                   -                                                                   |  `250`   |
| close-on-click-outside |  点击外部关闭弹出框  | `boolean` |                                                                   -                                                                   |  `true`  |
|    close-on-escape     |    esc关闭弹出框     | `boolean` |                                                                   -                                                                   |  `true`  |
|        z-index         |      z-index值       | `number`  |                                                                   -                                                                   |   `0`    |


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