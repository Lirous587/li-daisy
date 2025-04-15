# Collapse折叠面板

## 基础用法

<Collapse class="w-full">
    <CollapseItem title="Li-Daisy"> 小而美的组件 </CollapseItem>
    <CollapseItem title="Li-Daisy"> 小而美的组件 </CollapseItem>
</Collapse>

```vue
<Collapse class="w-full">
    <CollapseItem title="Li-Daisy"> 小而美的组件 </CollapseItem>
    <CollapseItem title="Li-Daisy"> 小而美的组件 </CollapseItem>
</Collapse>
```

## 显示边框

使用 `show-border` 来控制是否显示边框
<Collapse class="w-full" :show-border="true">
<CollapseItem title="Li-Daisy"> 小而美的组件 </CollapseItem>
<CollapseItem title="Li-Daisy"> 小而美的组件 </CollapseItem>
</Collapse>

```vue
<Collapse class="w-full" :show-border="true">
    <CollapseItem title="Li-Daisy"> 小而美的组件 </CollapseItem>
    <CollapseItem title="Li-Daisy"> 小而美的组件 </CollapseItem>
</Collapse>
```

## 设置图标

使用 `icon` 来设置需要显示的图标

> 可选值有 `plus` `arrow`

<Collapse class="w-full" :show-border="true" icon="arrow">
    <CollapseItem title="Li-Daisy"> 小而美的组件 </CollapseItem>
</Collapse>

```vue
<Collapse class="w-full" :show-border="true" icon="arrow">
    <CollapseItem title="Li-Daisy"> 小而美的组件 </CollapseItem>
</Collapse>
```

## 默认样式与激活样式

通过设置`default`与`active`来设置默认样式与激活样式:本质就是控制**背景色**和**文字颜色**

> 默认样式和激活样式可选值为 `primary` `secondary` `info` `accent` `neutral`

> [!IMPORTANT]
> 为了美观，当设置了样式之后，border不再显示
>
> > 同时激活状态只建议存在一条折叠信息的时候使用

<div class="spacy-4">
    <Collapse class="w-full" icon="arrow" default="secondary" active="primary">
      <CollapseItem title="Li-Daisy"> 小而美的组件 </CollapseItem>
    </Collapse>
    <Collapse class="w-full" icon="arrow" default="info" active="primary">
      <CollapseItem title="Li-Daisy"> 小而美的组件 </CollapseItem>
    </Collapse>
    <Collapse class="w-full" :show-border="true" default="info" active="primary">
      <CollapseItem title="只要设置了default或active"> border不再展示 </CollapseItem>
    </Collapse>
</div>

```vue
<div class="spacy-4">
    <Collapse class="w-full" icon="arrow" default="secondary" active="primary">
      <CollapseItem title="Li-Daisy"> 小而美的组件 </CollapseItem>
    </Collapse>
    <Collapse class="w-full" icon="arrow" default="info" active="primary">
      <CollapseItem title="Li-Daisy"> 小而美的组件 </CollapseItem>
    </Collapse>
    <Collapse class="w-full" :show-border="true" default="info" active="primary">
      <CollapseItem title="只要设置了border">
        default或active不再展示 
      </CollapseItem>
    </Collapse>
</div>
```

## API

> none

### Attributes

#### Collapse

|   属性值    |        说明        |  类型   |                 具体类型/示范                  | 默认值  |
| :---------: | :----------------: | :-----: | :--------------------------------------------: | :-----: |
|    title    | Collapse显示的文字 | string  |                    Li-Daisy                    |    -    |
| show-border |    是否展示边框    | boolean |                     false                      |  false  |
|    icon     |     显式的图标     |  enum   |                ['plus','arrow']                | 'arrow' |
|   default   |     未激活样式     |  enum   | ['primary','secondary','info','accent','info'] |    -    |
|   active    |      激活样式      |  enum   | ['primary','secondary','info','accent','info'] |    -    |

### Event

> none

### Slots

#### Collapse

| 插槽名  |         说明         |
| :-----: | :------------------: |
| default | 填充CollapseItem列表 |

#### CollapseItem

| 插槽名  |   说明   |
| :-----: | :------: |
| default | 显示文字 |

### Expose

> none
