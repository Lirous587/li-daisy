# Popconfirm 气泡确认框

## 基础用法
> 通过 `trigger` 插槽来定义触发器内容,`width` 设置气泡确认框宽度
>> 
> 主动设置宽度很重要，可以避免一些溢出或换行，对页面美化很关键
:::demo popconfirm/basic
:::

## 自定义内容
> 通过 `title` 和 `action` 插槽分别自定义提示文字和按钮，用于满足自定义需求
>> 
> `action` 插槽可以解构出 `onConfirm`, `onCancle` 事件，用于自定义触发处理
:::demo popconfirm/custom
:::


## 位置
:::tip 位置可选值同 `Popover` 组件
`Popconfirm` 组件的位置和 `popover` 组件的位置一致，不再赘述
:::

## API

### Attributes

#### Props
|         属性值         |         说明         |   类型    |       具体类型       |  默认值  |
| :--------------------: | :------------------: | :-------: | :------------------: | :------: |
|        position        |       对齐位置       |  `enum`   | `PopconfirmPosition` | `bottom` |
|         offset         |     偏移距离(px)     | `number`  |          -           |   `6`    |
|        duration        | 弹出过渡动画持续时间 | `number`  |          -           |  `250`   |
|        btn-size        |       按钮大小       |  `enum`   |  `[xs,sm,md,lg,xl]`  |  `250`   |
|        z-index         |      z-index值       | `number`  |          -           |   `0`    |
| close-on-click-outside |  点击外部关闭弹出框  | `boolean` |          -           |  `true`  |
|    close-on-escape     |    esc关闭弹出框     | `boolean` |          -           |  `true`  |


### Event
|  名称   |     说明     |   具体类型   |
| :-----: | :----------: | :----------: |
| confirm | 确定操作回调 | `() => void` |
| cancle  | 取消操作回调 | `() => void` |


### Slots
|  名称   |     说明     |
| :-----: | :----------: |
| trigger |  触发器插槽  |
|  title  | 提示文本插槽 |
| action  |   操作插槽   |
