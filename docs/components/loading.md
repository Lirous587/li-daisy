# loading指令


## 使用
```ts
import App from './App.vue'
import { loadingDirective } from 'li-daisy'

const app = createApp(App)

<!-- 自定义指令名称 这里假定为loading -->
app.use('loading',loadingDirective)
```



## 基础用法
> 通过 `v-loading` 指令去绑定 loading 状态
:::demo loading/basic
:::

## 参数/对象设置
> 通过指令的参数（arg）、修饰符（modifiers）或 value 对象来灵活配置 `v-loading`  
- 布尔模式（仅控制显隐）  
  ```html
  <div v-loading="loading">…</div>
  ```
- 参数模式（指定 type）  
  ```html
  <div v-loading:ball="loading">type=ball</div>
  ```
- 修饰符模式（指定 type、color、size）  
  ```html
  <div v-loading:bars.error.xs="loading">type=bars, color=error, size=xs</div>
  ```
- 对象模式（同时配置多个属性）  
  ```html
  <div
    v-loading="{ visible: loading, type: 'ring', color: 'accent', size: 'lg' }"
  >…</div>
  ```
:::demo loading/set
:::

## 参数说明

### 1. 可选参数来源
- **value**（布尔或对象）  
  - 布尔：控制显隐  
  - 对象：可同时设置 `visible` / `type` / `color` / `size`
- **arg**（位置参数）  
  - 同时可作为 `type` / `color` / `size`
- **modifiers**（修饰符）  
  - 逐项指定 `type` / `color` / `size`

### 2. 参数规则
| 属性    | 所在位置                | 类型    | 可选值                                                                                    | 默认值    |
| ------- | ----------------------- | ------- | ----------------------------------------------------------------------------------------- | --------- |
| visible | value (boolean)         | boolean | `true` / `false`                                                                          | `false`   |
| type    | value / arg / modifiers | string  | `spinner` / `dots` / `ring` / `ball` / `bars`                                             | `spinner` |
| color   | value / arg / modifiers | string  | `primary` / `secondary` / `accent` / `neutral` / `info` / `success` / `warning` / `error` | `primary` |
| size    | value / arg / modifiers | string  | `xs` / `sm` / `md` / `lg` / `xl`                                                          | `md`      |

### 3. 优先级
`value` > `arg` = `modifiers`