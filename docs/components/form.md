# Form表单

## 基本使用 
:::demo form/basic
:::


## 按钮导致的表单提交
> 当 `Form` 组件下存在 `button` 时，点击 `button` 会默认触发表单验证
> >
> 这并不是 **bug**，这是HTML的标准行为，`button` 的默认type就是 `submit`
> >
> 不想触发该行为的话将 `button` 的 type 设置了 `button` 即可

:::demo form/button
:::



## 排列方向
> 通过修改 `Form` 的 `align` 属性可以实现，整体的水平或者垂直排列方式
>>
> 考虑到一些情况下可能需要更为灵活的排列方式 故此 `FormItem` 也可以设置 `align` 属性来修改对齐方式，该项优先级更大
>> 
> 两者的 `align` 可选值有 `horizontal` `vertical` ，默认为 `horizontal`
:::demo form/align
:::

## 使用yup验证
> `Form` 组件由 [vee-validate](https://vee-validate.logaretm.com/v4/) 和 [yup](https://github.com/jquense/yup) 封装而成，`yup` 作为其认证库
>>
> 组件内部封装了一个简单的 `yup` 全局实例，其代码见 [仓库源码](https://github.com/Lirous587/li-daisy/blob/main/packages/Form/src/yup.ts)
>>
> 借此，用户可以自行选择如何使用 `yup`，如果需要更小的打包体积建议使用按需从 `yup` 导入，即不要使用 `import * as yup from 'yup'` 这种方式去使用 `yup`
>> 
> 同理用户可以自行定义一系列基础配置，比如基础验证消息中文翻译，`i18n` 等
>>
> 下面将演示如何去使用 `yup` ，以及如何实现一个简单的配置
:::demo form/yup
:::

## 例子
### 注册
:::demo form/register
:::

## API

### Attributes

#### Form
|   属性值    |       说明        |  类型  |       具体类型/示范       |    默认值    |
| :---------: | :---------------: | :----: | :-----------------------: | :----------: |
|   schema    | 定义的yup验证规则 | object |       GenericObject       |      -       |
| label-width |     label宽度     | string |          '80px'           |    '60px'    |
|    align    |     对齐方向      |  enum  | ['horizontal','vertical'] | 'horizontal' |


#### FormItem
| 属性值  |       说明       |  类型  |       具体类型/示范       |    默认值    |
| :-----: | :--------------: | :----: | :-----------------------: | :----------: |
|  name   | 对应schema的key  | string |        'password'         |      -       |
|  label  |     label名      | string |          '密码'           |      -       |
| trigger | 错误信息显示时机 |  enum  | ['change','blur','input'] |    '60px'    |
|  align  |     对齐方向     |  enum  | ['horizontal','vertical'] | 'horizontal' |

### Event

> none

### Slots

#### Form
| 插槽名  |   说明   |
| :-----: | :------: |
| default | 默认插槽 |

#### FormItem
| 插槽名  |   说明   |
| :-----: | :------: |
| default | 默认插槽 |

