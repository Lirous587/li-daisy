# Notification 通知

## 类型 
> 通过 `type` 来设置通知类型，可选值有 `info` `success` `warning` `error`

:::demo notification/type
:::

## 位置
> 通过 `position` 来设置通知位置，可选值有 `top-start` `top-center` `top-end` `bottom-start` `bottom-end`

:::demo notification/position
:::

## 关闭图标
> 通过 `showCloseIcon` 来设置是否显示关闭图标，默认值为 `false`
> 当 `showCloseIcon` 设置为true时, autoClose必定为 `true`，即使给定值为 `false` 也不会生效

:::demo notification/CloseIcon
:::

## Vnode
> `message` 参数也可为 `Vnode`

:::demo notification/vnode
:::

## API

### 配置项

| 参数          | 类型                   | 默认值      | 说明                               |
| ------------- | ---------------------- | ----------- | ---------------------------------- |
| title         | `string`               | -           | 通知标题                           |
| message       | `[string,Vnode]`       | -           | 通知内容                           |
| type          | `NotificationType`     | `'info'`    | 通知类型                           |
| position      | `NotificationPosition` | `'top-end'` | 通知位置                           |
| duration      | `number`               | `2000`      | 自动消失时间（毫秒），低于1000无效 |
| autoClose     | `boolean`              | `true`      | 是否自动关闭                       |
| showCloseIcon | `boolean`              | `false`     | 是否显示右上角关闭图标             |