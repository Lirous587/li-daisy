# Queue 队列

用于显示通知消息的队列管理组件，支持多个位置的消息展示和自动排队管理，主要用于自定义组件的二次封装


## 自定义组件
**queue** 支持传入自定义的 Vue 组件作为消息内容。组件的props应当为 `QueueItemRef` 的扩展：

> **以下是自定义组件部分代码**
```
<template>
  ...组件内容
</template>

<script setup lang="ts">
import type { QueueItemRef } from 'li-daisy'

export interface ToastProps {
  title?: string
  message?: string
}

const props = defineProps<QueueItemRef & ToastProps>()
</script>
```
:::demo queue/component
:::


## 使用VNode

与上述使用方法类似

:::demo queue/vnode
:::

## 自动关闭

通过设置 `options` 的 `autoClose` 来控制消息是否自动关闭
:::demo queue/autoClose
:::

## API

### queue.addComponent(component,props, options)

添加一个组件到队列中

**参数：**

- `component` - Vue 组件 (Component)
- `props` 组件对应的props (extends Record<string, any>)
- `options` - QueueItemOptions 配置选项

**Options：**

| 参数      | 类型            | 默认值      | 说明                            |
| --------- | --------------- | ----------- | ------------------------------- |
| position  | `QueuePosition` | `'top-end'` | 消息显示位置                    |
| duration  | `number`        | -           | 自动消失时间（毫秒）低于1000无效 |
| onClose   | `() => void`    | -           | 消息关闭时的回调函数            |
| autoClose | `boolean`       | `true`      | 是否自动关闭消息                |


**返回值：** `string` - 消息的唯一 ID

### queue.remove(id)

手动移除指定的消息

### queue.setStaggerDelay(delay)

设置消息错开关闭的延迟时间，用于优化体验，默认值为 **400ms**，只能设置一次，重复调用会抛出错误

## 位置类型

`QueuePosition` 支持以下位置：

- `'top-start'` - 左上角
- `'top-center'` - 顶部居中  
- `'top-end'` - 右上角
- `'bottom-start'` - 左下角
- `'bottom-end'` - 右下角