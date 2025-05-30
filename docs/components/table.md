# Table表格

## 基础用法
> `Table` 组件通过 `data` 属性接收需要渲染的表格数据数组。`TableColumn` 组件用于定义表格的列，其 `prop` 属性指定该列需要展示的数据对象的键名，`label` 属性则定义了该列的表头标题
>> 
> `zebra` 来设置是否显示斑马条纹，`border` 来设置是否显示边框
>>
> 可以使用 `width` 属性来定义列宽的，类型为 `number`，单位为 `px`
>>
> `align` 和 `header-align` 来定义对齐方式
:::demo table/basic
:::


## 自定义表头
> 通过 `TableColumn` 下的 `header` 插槽来自定义表头，其内可以提取 `label` 和 `prop` 两个属性

:::demo table/header
:::

## 自定义列
> 通过 `TableColumn` 下的 `default` 插槽来自定义表头，其内可以提取 `row` 和 `index` 两个属性

:::demo table/column
:::


## 固定表头
> 为 `Table` 设置高度后，y轴溢出即可体现固定表头的效果

:::demo table/PinHeader
:::


## 固定列
> 通过设置 `pin-col` 来设置固定列位置，可选值有 `left` `right`
>>
> 被设置了 `pin-col` 的TableColumn，其布局不再按照简单的先后顺序来排列，而是将 `left` 依次排在前列，`right` 依次排在后列
>> 
> 设置 `select` 之后，选择列默认为固定列
:::demo table/PinColumn
:::

## 展开行
> `TableColumn` 组件设置 `type` 为 `expand` 即可设置展开行
>>
> 该插槽暴露 `row` `index` 两个属性
:::demo table/expand
:::


## 选择列
> `select` 来设置表格是否可选，`selectable` 来设置可选列的回调函数
>>
> 当全选或选择列时会触发 `select-change` 回调

:::demo table/select
:::

## 溢出提示
> 当表格内容过长时，可设置 `tooltip` 来配置溢出提示
:::demo table/tooltip
:::

## API

### Attributes

#### Table
|   属性值   |         说明         |             类型             |           具体类型           |  默认值  |
| :--------: | :------------------: | :--------------------------: | :--------------------------: | :------: |
|    data    |       表格数据       | `Array<Record<string, any>>` |              -               |    -     |
|    size    |       表格大小       |            `enum`            | `['xs','sm','md','lg','xl']` | `'info'` |
|   zebra    |    是否带有斑马纹    |          `boolean`           |              -               | `false`  |
|   border   |     是否显示边框     |          `boolean`           |              -               | `false`  |
|   select   |       是否可选       |           `select`           |              -               | `false`  |
| selectable | 设置可选列的回调函数 |          `Function`          |   `(item: any) => boolean`   | `false`  |

#### TableColumn
| 属性值  |      说明      |   类型   |      具体类型      | 默认值 |
| :-----: | :------------: | :------: | :----------------: | :----: |
|  prop   | 列内容的字段名 | `string` |         -          |   -    |
|  label  |    表格标签    | `string` |         -          |   -    |
|  width  | 单元格宽度(px) | `number` |         -          |   -    |
| pin-col |    固定位置    |  `enum`  | `['left','right']` |   -    |


### Event
|     名称      |         说明         |       具体类型       |
| :-----------: | :------------------: | :------------------: |
| select-change | 全选或选择某列时触发 | `(item:any) => void` |

### Slots

#### Table
| 插槽名  |   说明   |
| :-----: | :------: |
| default | 默认插槽 |

#### TableColumn
| 插槽名  |      说明      |             暴露属性              |
| :-----: | :------------: | :-------------------------------: |
| default | 单元格内容插槽 | `{ row: object, index: number }`  |
| header  |  表头内容插槽  | `{ label: string, prop: string }` |
| expand  |   展开行插槽   | `{ row: object, index: number }`  |
