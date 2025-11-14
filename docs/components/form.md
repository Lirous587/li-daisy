# Form表单
> 用于数据校验和提交

## 按钮导致的表单提交

:::tip 2.6.9 之前
当 `Form` 组件下存在 `button` 时，点击 `button` 会默认触发表单验证
>
这并不是 **bug**，这是HTML的标准行为，`button` 的默认type就是 `submit`
>
不想触发该行为的话将 `button` 的 type 设置了 `button` 即可
>
**该问题已于2.6.10解决，无需额外处理，已自动阻止表单自动提交事件**
:::


## 排列方向

> 通过修改 `Form` 的 `align` 属性可以实现，整体的水平或者垂直排列方式
>
> 考虑到一些情况下可能需要更为灵活的排列方式 故此 `FormItem` 也可以设置 `align` 属性来修改对齐方式，该项优先级更大
>
> 两者的 `align` 可选值有 `horizontal` `vertical` ，默认为 `horizontal`
:::demo form/align
:::

## 使用yup验证

> `Form` 组件由 [vee-validate](https://vee-validate.logaretm.com/v4/) 和 [yup](https://github.com/jquense/yup) 封装而成，`yup` 作为其认证库
>
> 组件内部封装了一个简单的 `yup` 全局实例，其代码见 [仓库源码](https://github.com/Lirous587/li-daisy/blob/main/packages/Form/src/yup.ts)
>
> 借此，用户可以自行选择如何使用 `yup`，如果需要更小的打包体积建议使用按需从 `yup` 导入，即不要使用 `import * as yup from 'yup'` 这种方式去使用 `yup`
>
> 同理用户可以自行定义一系列基础配置，比如基础验证消息中文翻译，`i18n` 等
>
> 下面将演示如何去使用 `yup` ，以及如何实现一个简单的配置
:::demo form/yup
:::

## 例子

### 验证表单（注册示例）

> 通过 `FormRef` 的 `validate` 方法校验整个表单，返回一个 Promise
> 
> 校验通过时进入 `then` 回调，校验失败时进入 `catch` 回调
>
> 该方法只校验单个字段，失败时智慧展示**所有字段**的错误提示
:::demo form/register
:::

### 验证单个字段

> 通过 `FormRef` 的 `validateField` 方法校验指定字段，返回一个 Promise
> 
> 校验通过时进入 `then` 回调，校验失败时进入 `catch` 回调，并可获取错误信息
>
> 该方法只校验单个字段，失败时智慧展示**指定字段**的错误提示
:::demo form/validateField
:::


## 检测验证是否通过

> 提供两种互补方式，选择取决于场景（UI 状态 vs 提交时需触发异步 schema 规则）。

- `isValid`（响应式）
  - 描述：响应式布尔值，用于反映当前表单是否有错误（基于内部 errors）。
  - 适用场景：实时 UI 控制，例如禁用/启用提交按钮、显示简单状态提示。
  - 注意：不会主动触发 yup 的异步 test 或远程校验，仅反映已被触发并记录的错误状态。

- `validate` / `validateField`（手动触发的异步校验）
  - 描述：调用时会执行 yup schema 上的所有规则（包括自定义的异步 test），返回 Promise。
  - validate(): 校验整个表单，常用于提交前的最终校验。
  - validateField(name): 校验单个字段，适合失焦校验或需要远程校验的场景。
  - 适用场景：提交时需等待异步规则（如远程唯一性校验）、对单字段做即时校验。

## API

### Attributes

#### Form

|   属性值    |       说明       |                              类型                               |    默认值    |
| :---------: | :--------------: | :-------------------------------------------------------------: | :----------: |
|    form     | 待验证的响应对象 | `Ref<Record<string, any>>` <br/>`Reactive<Record<string, any>>` |      -       |
|   schema    |   yup验证规则    |                         `GenericObject`                         |      -       |
| label-width |    label宽度     |                            `string`                             |   `'60px'`   |
|    align    |     对齐方向     |                   `['horizontal','vertical']`                   | `'vertical'` |

#### FormItem

| 属性值  |       说明       |            类型             |    默认值    |
| :-----: | :--------------: | :-------------------------: | :----------: |
|  name   |   schema的key    |          `string`           |      -       |
|  label  |     label名      |          `string`           |      -       |
| trigger | 错误信息显示时机 | `['change','blur','input']` |   `'change'`   |
|  align  |     对齐方向     | `['horizontal','vertical']` | `'vertical'` |

### Slots

#### Form

| 插槽名  |   说明   |
| :-----: | :------: |
| default | 默认插槽 |

#### FormItem

| 插槽名  |   说明   |
| :-----: | :------: |
| default | 默认插槽 |

### Expose

#### Form

|    方法名     |     说明     |                  类型                  |
| :-----------: | :----------: | :------------------------------------: |
|   validate    | 验证整个表单 |         `() => Promise<void>`          |
| validateField | 验证某个字段 | `(fieldName: string) => Promise<void>` |
|    isValid    | 验证是否通过 |               `boolean`                |

