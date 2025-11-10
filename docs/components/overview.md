# 组件列表

## 介绍

Li-Daisy 是一个基于 Vue 3 的轻量级组件库，结合 daisyUI 的原子化能力，提供了一系列简洁、易用的 UI 组件，帮助开发者快速构建现代化的 Web 应用。

::: warning 非官方项目
Li-Daisy 并非 daisyUI 或 Tailwind CSS 的官方扩展，而是由个人开发者基于这些优秀框架创建的第三方组件库。

本项目旨在为 Vue 3 生态提供更便捷的 daisyUI 集成方案。
:::

## 组件导航

### 布局 (Layout)

用于页面结构和内容组织的组件。

<ComponentGrid :componentList="[
  {
    img:'/drawer.png',
    url: '/components/drawer',
    title: 'Drawer 抽屉',
    details: '用于显示/隐藏页面侧边栏'
  },
  {
    img: '/queue.png',  
    url: '/components/queue',
    title: 'Queue 队列',
    details: '用于实现队列式进出的布局容器'
  }
]" />

### 数据输入 (Data Entry)

用于收集用户输入数据的组件。

<ComponentGrid :componentList="[
  {
    img: '/input.png',
    url: '/components/textInput',
    title: 'TextInput 文本输入框',
    details: '用于输入单行文本数据'
  },
  {
    img: '/textarea.png',
    url: '/components/textarea',
    title: 'Textarea 多行文本输入框',
    details: '用于输入较长文本数据'
  },
  {
    img: '/numberInput.png',
    url: '/components/numberInput',
    title: 'NumberInput 数字输入框',
    details: '用于输入数字'
  },
  {
    img: '/form.png',
    url: '/components/form',
    title: 'Form 表单',
    details: '用于数据校验和提交'
  }
]" />

### 数据展示 (Data Display)

用于呈现结构化数据的组件。

<ComponentGrid :componentList="[
  {
    img: '/table.png',  
    url: '/components/table',
    title: 'Table 表格',
    details: '用于展示行列数据'
  },
  {
    img: '/paging.png',  
    url: '/components/paging',
    title: 'Paging 分页',
    details: '用于对大量数据进行分页展示'
  },
]" />

### 反馈 (Feedback)

向用户传达状态或操作结果的组件。

<ComponentGrid :componentList="[
  {
    img: '/modal.png',  
    url: '/components/modal',
    title: 'Modal 对话框',
    details: '用于需要用户响应的操作或信息展示'
  },
  {
    img: '/notification.png',  
    url: '/components/notification',
    title: 'Notification 通知',
    details: '用于显示操作反馈通知'
  },
  {
    img: '/message.png',  
    url: '/components/message',
    title: 'Message 消息条',
    details: '用于轻量级的消息提示'
  },
  {
    img: '/skeleton.png',  
    url: '/components/skeleton',
    title: 'Skeleton 骨架屏',
    details: '在数据加载时提供占位效果'
  },
  {
    img: '/popover.png',  
    url: '/components/popover',
    title: 'Popover 弹出框',
    details: '用于在页面上显示额外信息或操作'
  },
  {
    img: '/popconfirm.png',  
    url: '/components/popconfirm',
    title: 'Popconfirm 气泡确定框',
    details: '用于危险操作的再次确定'
  },
]" />

### 主题 (Theme)

与应用主题和样式相关的组件。

<ComponentGrid :componentList="[
  {
    img: '/themeSwitch.png',  
    url: '/components/themeSwitch',
    title: 'ThemeSwitch 主题切换器',
    details: '用于切换应用的明暗主题'
  },
]" />

### 工具类 (Tools)

一些辅助指令。

<ComponentGrid :componentList="[
  {
    img: '/loading.png',  
    url: '/components/loading',
    title: 'loading 指令',
    details: '用于防抖，占位'
  },
]" />

## 开发计划

::: tip 持续更新
Li-Daisy 正在积极开发中，未来将会添加更多实用组件

如果你有好的建议或需求，欢迎在 [GitHub Issues](https://github.com/Lirous587/Li-Daisy/issues) 中提出
:::

**即将推出**:
- [] Tree 通用树

## 贡献指南
欢迎贡献代码! 

## 许可证
Li-Daisy 基于 [MIT](https://github.com/Lirous587/Li-Daisy/blob/main/LICENSE) 许可证开源