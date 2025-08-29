# Collapse折叠面板

## 显示边框

> `border` 来控制是否是否展示父级边框
>>
> `items-border` 来控制是否展示CollapseItem之间的边框

:::demo collapse/border
:::

## 设置图标

使用 `icon` 来设置需要显示的图标

> 可选值有 `plus` `arrow`

:::demo collapse/icon
:::

## 默认样式与激活样式

通过设置 `default` 与 `active` 来设置默认样式与激活样式:本质就是控制**背景色**和**文字颜色**

> 默认样式和激活样式可选值为 `primary` `secondary` `info` `accent` `neutral`

> [!IMPORTANT]
> 为了美观，当设置了样式之后，CollapseItem间的border不再显示
>
> 同时激活状态只建议存在一条折叠信息的时候使用

:::demo collapse/color
:::

## 设置默认打开子项

`default-open` 设置默认打开项，如有多个后者覆盖前者

:::demo collapse/defaultOpen
:::

此时默认打开的第二个

## API

### Attributes

#### Collapse
|    属性值    |              说明              |          类型          |  默认值   |
| :----------: | :----------------------------: | :--------------------: | :-------: |
|    title     |       Collapse显示的文字       |        `string`        |     -     |
|    border    |        是否展示父级边框        |       `boolean`        |  `true`   |
| items-border | 是否展示CollapseItem之间的边框 |       `boolean`        |  `true`   |
|     icon     |           显式的图标           |     `CollapseIcon`     | `'arrow'` |
| defaultColor |           未激活样式           | `CollapseDefaultColor` |     -     |
| activeColor  |            激活样式            | `CollapseActiveColor`  |     -     |


#### CollapseItem
|    属性值    |      说明      |   类型    | 默认值 |
| :----------: | :------------: | :-------: | :----: |
| default-open | 是否为打开子项 | `boolean` |   -    |


### Slots

#### Collapse
| 插槽名  |         说明         |
| :-----: | :------------------: |
| default | 填充CollapseItem列表 |

#### CollapseItem
| 插槽名  | 说明  |
| :-----: | :---: |
| default |   -   |