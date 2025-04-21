# Paging分页

## 基础用法
> 通过 `pages` 设置总页码
:::demo paging/basic
:::


## 单页时隐藏
> 通过 `hide-on-single-page` 设置单页隐藏分页，默认为 `false`
:::demo paging/singel
:::


## 设置offset
> 通过 `offset` 设置偏移量，用于显示更大的可选区间，默认为 `1`
>>
> 关于分页区间的显示:始终显示**第一页**和**最后一页**，offset影响的是当前页码选中时左右最多可显示页码数(除开第一页和最后一页)
>>
> 该例子中当前页为 **第5页** 时，就能显示 1 ... **3** **4** 5 **6** **7** ... 10 
:::demo paging/offset
:::


## 是否显示Icon
> 通过 `show-icon` 设置是否显示箭头图标，默认为 `true`
:::demo paging/icon
:::

## 小设备隐藏Icon
> 通过 `sm-hide-icon` 设置是否隐藏小设备（宽度640px以下）上的箭头图标，默认为 `true`
:::demo paging/sm
:::

## 关于爬虫 (SEO 优化)

为了方便搜索引擎爬虫发现和索引分页内容，`paging` 组件内置了 SEO 优化机制。当配置了链接生成方式时，组件会自动在内部渲染一个视觉上隐藏（但对爬虫和屏幕阅读器可见）的 `<div>`，其中包含指向上一页和下一页的 `<a>` 链接。

`paging` 提供了两种方式来生成这些 SEO 友好的链接：

### 1. 使用 `pre-href` (简单路径)

适用于分页链接结构为 `基础路径 + 页码` 的情况 (例如 `/articles/2`)。你只需提供 URL 前缀，组件会自动附加页码。

### 2. 使用 `href-generator` (复杂 URL 或自定义逻辑)

适用于 URL 结构复杂（如包含查询参数 `/search?query=abc&page=2`）或需要自定义链接生成逻辑的场景。你需要提供一个函数，该函数接收页码并返回完整的 URL 字符串。此方法优先于 `pre-href`。

下面的示例演示了这两种方法的使用：

:::demo paging/ssr
:::

## API

### Attributes

#### Props
|      属性值      |            说明            |   类型   |      具体类型/示范       | 默认值 |
| :--------------: | :------------------------: | :------: | :----------------------: | :----: |
|      pages       |          分页总数          |  number  |            10            |   -    |
| hideOnSinglePage |       单页时是否隐藏       | boolean  |           true           | false  |
|      offset      |           偏移量           |  number  |            2             |   1    |
|     showIcon     |       否显示箭头图标       | boolean  |          false           |  ture  |
|    smHideIcon    | 是否隐藏小设备上的箭头图标 | boolean  |          false           |  ture  |
|     preHref      |        简单路径前缀        |  string  |        '/article'        |   -    |
|  hrefGenerator   |     自定义路径生成逻辑     | Function | (page: number) => string |   -    |



### Event

|  名称  |     说明     |       具体类型        |
| :----: | :----------: | :-------------------: |
| change | 页面跳转回调 | (page:number) => void |
### Slots

> none

### Expose

> none
