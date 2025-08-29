# Skeleton骨架屏

## 基础用法 
:::demo skeleton/basic
:::

## 直接使用skeleton类
> `SkeletonItem` 组件本质就是一个仅有 `skeleton` 类的容器，因此可以直接使用 `skeleton` 来代替 `SkeletonItem` 组件
:::demo skeleton/class
:::

## 设置count
> 通过设置 `count` 来设置占位的骨架屏数目，默认值为 `1`
>> 
> 此项不建议设置过大，因为要进行节点的创建和销毁，有一定开销



## 设置delay
> 通过设置 `delay` 来设置延迟效果
>> 
> 当网络请求较快时，较容易出现闪烁的现象，通过设置这项，用户可以得到较好的视觉效果，默认值为 `200`（单位为ms）


## API


### Attributes

#### Skeleton 
| 属性值  |    说明     |   类型    | 默认值 |
| :-----: | :---------: | :-------: | :----: |
| loading |  加载状态   | `boolean` |   -    |
|  delay  | 延迟时间/ms | `number`  | `300`  |
|  count  |  骨架数目   | `number`  |  `1`   |

### Slots

#### Skeleton 
| 插槽名  |       说明       |
| :-----: | :--------------: |
| content | 实际要渲染的内容 |
| skelton |    骨架屏内容    |
