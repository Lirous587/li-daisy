# Avatar头像


## 尺寸
> 可选尺寸有 `xs` `sm` `md` `lg` `xl`

:::demo avatar/size
:::

## 加载失败显示文字

> 通过 `text` 设置

:::demo avatar/failed
:::

## API

### Attributes
| 属性值 |         说明         |     类型     | 默认值 |
| :----: | :------------------: | :----------: | :----: |
| avatar |       头像url        |   `string`   |   -    |
|  size  |       头像大小       | `AvatarSize` |   -    |
|  text  | 加载失败后的显式文字 |   `string`   |   -    |

### Event
|  名称   |     说明     |     类型     |
| :-----: | :----------: | :----------: |
| success | 加载成功触发 | `() => void` |
| failed  | 加载失败触发 | `() => void` |
