# Toast消息提示

## 类型 
> 通过 `type` 来设置消息类型，可选值有 `info` `success` `warning` `error`

:::demo toast/type
:::


<!-- ### custom类型
:::demo toast/custom
::: -->


## 位置
> 通过 `position` 来设置消息位置，可选值有 `top-start` `top-center` `top-end` `bottom-start` `bottom-end`

:::demo toast/position
:::

## 关闭图标
> 通过 `closeIcon` 来设置是否显示图标，默认值为 `false`

:::demo toast/close
:::

## Vnode
> `message` 参数也可为 `Vnode`

:::demo toast/vnode
:::

## API

### 配置项

| 参数      | 类型             | 默认值      | 说明                                                                |
| --------- | ---------------- | ----------- | ------------------------------------------------------------------- |
| message   | `[string,Vnode]` | -           | 消息内容                                                            |
| title     | `string`         | -           | 消息标题                                                            |
| type      | `ToastType`      | `'info'`    | 消息类型，可选值：`info` `success` `warning` `error` `custom`       |
| position  | `ToastPosition`  | `'top-end'` | 消息位置，可选值：`top-start` `top-end` `bottom-start` `bottom-end` |
| duration  | `number`         | `2000`      | 自动消失时间（毫秒），低于1000无效                                  |
| autoClose | `boolean`        | `true`      | 是否自动关闭                                                        |
| closeIcon | `boolean`        | `false`     | 是否显示图标                                                        |

