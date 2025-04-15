# Avatar头像

## 调整尺寸

> 可选尺寸有 `sm` `lg` `xl`
>
> `md`即默认尺寸 无对外暴露

<div class="flex gap-4 items-center m-3">
    <Avatar avatar="https://picsum.photos/600/600" size="sm"/>
    <Avatar avatar="https://picsum.photos/600/600"/>
    <Avatar avatar="https://picsum.photos/600/600" size="lg"/>
    <Avatar avatar="https://picsum.photos/600/600" size="xl"/>
</div>

```vue
<div class="flex gap-4 items-center m-3">
    <Avatar avatar="https://picsum.photos/600/600" size="sm"/>
    <Avatar avatar="https://picsum.photos/600/600"/>
    <Avatar avatar="https://picsum.photos/600/600" size="lg"/>
    <Avatar avatar="https://picsum.photos/600/600" size="xl"/>
</div>
```

## 加载失败显示文字

通过**text**设置

<div class="flex gap-4 items-center m-3">
    <Avatar avatar="https://picsum.photos/xx" text="L" size="sm"/>
    <Avatar avatar="https://picsum.photos/xx" text="Li"/>
    <Avatar avatar="https://picsum.photos/xx" text="Lirous" size="lg"/>
    <Avatar avatar="https://picsum.photos/xx" text="Li-daisy" size="xl"/>
</div>

```vue
<div class="flex gap-4 items-center m-3">
    <Avatar avatar="https://picsum.photos/xx" text="L" size="sm"/>
    <Avatar avatar="https://picsum.photos/xx" text="Li"/>
    <Avatar avatar="https://picsum.photos/xx" text="Lirous" size="lg"/>
    <Avatar avatar="https://picsum.photos/xx" text="Li-daisy" size="xl"/>
</div>
```

## 加载之后的回调

组件emit两个方法 `success`和 `failed`

<div class="flex gap-4 items-center m-3">
    <Avatar avatar="https://picsum.photos/600/600"  @success="handleSuccess"/>
    <Avatar avatar="noexist" text="Li" @failed="handleFailed"/>
</div>

<script setup>
const handleSuccess = () => {
    console.log("load success");
}

const handleFailed = () => {
    console.log("load failed");
}
</script>

```
<div class="flex gap-4 items-center m-3">
    <Avatar avatar="https://picsum.photos/600/600"  @success="handleSuccess"/>
    <Avatar avatar="noexist" text="Li" @failed="handleFailed"/>
</div>

<script setup>
const handleSuccess = () => {
    console.log("load success");
}

const handleFailed = () => {
    console.log("load failed");
}
</script>
```

## API

> none

### Attributes

| 属性值 |         说明         |  类型  | 具体类型/示范 | 默认值 |
| :----: | :------------------: | :----: | :-----------: | :----: |
|  size  |       头像大小       |  enum  |  ['sm','lg']  |   -    |
|  name  | 加载失败后的显式文字 | string |  ['Lirous']   |   -    |

### Event

|  名称   |     说明     |   类型   | 具体类型/示范 |
| :-----: | :----------: | :------: | :-----------: |
| success | 加载成功触发 | Function |    ()=>{}     |
| failed  | 加载失败触发 | Function |    ()=>{}     |

### Slots

> none

### Expose

> none
