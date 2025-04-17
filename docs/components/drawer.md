# Collapse折叠面板

## 基础用法

<div>
  <Drawer
    ref="drawerRef"
    title="抽屉标题"
    size="40%"
    direction="ltr"
    :close-on-click-modal="false"
  >
    这是抽屉内容
  </Drawer>
  <div class="btn btn-primary" @click="handleOpenDrawer">打开抽屉</div>
</div>

<script setup lang="ts">
import type { DrawerRef } from '@/index'
import { ref } from 'vue'

const drawerRef = ref<DrawerRef>()
const handleOpenDrawer = () => {
  drawerRef.value?.open()
}
</script>

<details>
<summary>点击查看代码</summary>

::: code-group

```js [config.js]
const config = {
  // ...
}

export default config
```

```ts [config.ts]
import type { UserConfig } from 'vitepress'

const config: UserConfig = {
  // ...
}

export default config
```

:::
</details>

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
