# Avatar头像

## 调整尺寸

> 可选尺寸有 `sm` `lg` `xl`
>
> `md` 即默认尺寸 不对外暴露

:::demo avatar/size
:::

## 加载失败显示文字

> 通过 `text` 设置

:::demo avatar/failed
:::

## 加载之后的回调
> 组件emit两个方法 `success` 和 `failed`

:::demo avatar/load
:::

## API

### Attributes

| 属性值 |         说明         |  类型  | 具体类型/示范 | 默认值 |
| :----: | :------------------: | :----: | :-----------: | :----: |
|  size  |       头像大小       |  enum  |  ['sm','lg']  |   -    |
|  name  | 加载失败后的显式文字 | string |  ['Lirous']   |   -    |

### Event

|  名称   |     说明     |  具体类型  |
| :-----: | :----------: | :--------: |
| success | 加载成功触发 | () => void |
| failed  | 加载失败触发 | () => void |

### Slots

> none

### Expose

> none
