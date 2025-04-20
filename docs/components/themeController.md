# ThemeController主题控制器

## 基本使用 
> `props` 有 `themes` `darkThemes` 
>>
> `themes` 定义包含的的主题
>>
> `darkThemes` 定义哪些主题为暗黑主题，即切换主题的时候 `ifDark` 依据这项配置判断
> >
> 这个定义主要是解决一些库仅仅支持 `class="dark"` 来响应样式的问题 **或** 仅仅只有 `light` 和 `dark` 两种主题的问题
> >
> 提供了 `theme` 和 `ifDark` 两个响应式绑定 
> >
> `@change` 用于处理切换主题的回调，返回对应的 `theme` 值
>>
>使用了daisyui官方的全部主题，通常不需要做多余处理，自行选择需要的主题即可
如果需要自定义额外主题，只需要添加配置好对应的css即可开箱即用 
[daisyui文档](https://daisyui.com/docs/themes/)

:::demo themeController/basic
:::


## API


### Attributes

|   属性值   |     说明     |   类型   |          具体类型/示范           | 默认值 |
| :--------: | :----------: | :------: | :------------------------------: | :----: |
|   themes   |   定义主题   | string[] |   ['default','dark','cupcake']   |  "-"   |
| darkThemes | 定义暗黑主题 | string[] | ['dark','synthwave','halloween'] |  '-'   |


### Event

|  名称  |   说明   |   类型   |   具体类型/示范    |
| :----: | :------: | :------: | :----------------: |
| change | 切换主题 | Function | (theme:string)=>{} |
