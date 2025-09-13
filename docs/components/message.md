# Message 消息条

## 类型

> 通过 `type` 来设置消息类型，可选值有 `info` `success` `warning` `error`
>
> > `plain` 可设置消息是否取消背景色
> > :::demo message/type
> > :::

## 关闭图标

> 通过 `showCloseIcon` 来设置是否显示关闭图标，默认值为 `true`
> 当 `showCloseIcon` 设置为false时, autoClose必定为 `true`，即使给定值为 `false` 也不会生效

:::demo message/closeIcon
:::

## Vnode

> `message` 参数也可为 `Vnode`

:::demo message/vnode
:::

## API

### 配置项

| 参数                  | 类型               | 默认值   | 说明                               |
| --------------------- | ------------------ | -------- | ---------------------------------- |
| message               | `[string,Vnode]`   | -        | 消息内容                           |
| **以下为options配置** |                    |          |                                    |
| type                  | `NotificationType` | `'info'` | 消息类型                           |
| plain                 | `boolean`          | `false`  | 是否取消背景色                     |
| duration              | `number`           | `2000`   | 自动消失时间（毫秒），低于1000无效 |
| autoClose             | `boolean`          | `true`   | 是否自动关闭                       |
| showCloseIcon         | `boolean`          | `false`  | 是否显示右侧关闭图标               |
