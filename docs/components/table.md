# Table表格

## 基础用法 
:::demo table/basic
:::


## API

### Attributes

#### Table
| 属性值  |      说明      |              类型              |       具体类型/示范        | 默认值 |
| :-----: | :------------: | :----------------------------: | :------------------------: | :----: |
|  data   |    表格数据    | Array<Record<string, unknown>> |                            |   -    |
|  size   |    表格大小    |              enum              | ['xs','sm','md','lg','xl'] | 'info' |
|  zebra  | 是否带有斑马纹 |            boolean             |             -              |  true  |
| border  |  是否显示边框  |            boolean             |             -              |  true  |
| pinRows |  是否固定表头  |            boolean             |             -              | false  |
| pinCols |   是否固定列   |            boolean             |             -              | false  |

#### TableColumn
| 属性值 |        说明        |  类型  | 具体类型/示范 | 默认值 |
| :----: | :----------------: | :----: | :-----------: | :----: |
|  prop  | 对应列内容的字段名 | string |               |   -    |
| label  |      表格大小      | string |     'id'      |   -    |
| width  |  对应的单元格宽度  | string |    '200px'    |   -    |

### Event

> none

### Slots

#### Table
| 插槽名  |   说明   |
| :-----: | :------: |
| default | 默认插槽 |

#### TableColumn
| 插槽名  |   说明   |
| :-----: | :------: |
| default | 默认插槽 |


