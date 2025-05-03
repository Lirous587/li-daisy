# 组件总览

## 介绍

Li-Daisy 是一个基于 Vue 3 的轻量级组件库，结合 DaisyUI 的原子化能力，提供了一系列简洁、易用的 UI 组件，帮助开发者快速构建现代化的 Web 应用。

## 组件导航

### 布局 (Layout)

用于页面结构和内容组织的组件。

<ComponentGrid :componentList="[
  {
    img: 'https://picsum.photos/600/600',
    url: '/components/collapse',
    title: 'Collapse 折叠面板',
    details: '用于展示和隐藏信息'
  },
  {
    img: 'https://picsum.photos/600/600',
    url: '/components/drawer',
    title: 'Drawer 抽屉',
    details: '用于显示/隐藏页面侧边栏'
  },
  {
    img: 'https://picsum.photos/600/600',
    url: '#', // 暂无链接
    title: 'Sidebar Menu 侧边栏菜单 (计划中)',
    details: '用于应用主导航或侧边栏结构'
  },
]" />

### 数据录入 (Data Entry)

用于收集用户输入数据的组件。

<ComponentGrid :componentList="[
  {
    img: 'https://picsum.photos/600/600',
    url: '/components/textInput',
    title: 'TextInput 文本输入框',
    details: '用于输入单行文本数据'
  },
  {
    img: 'https://picsum.photos/600/600',
    url: '/components/textarea',
    title: 'Textarea 多行文本输入框',
    details: '用于输入较长文本数据'
  },
  {
    img: 'https://picsum.photos/600/600',
    url: '/components/numberInput',
    title: 'NumberInput 数字输入框',
    details: '用于输入数字'
  },
  {
    img: 'https://picsum.photos/600/600',
    url: '/components/form',
    title: 'Form 表单',
    details: '用于数据校验和提交'
  },
  {
    img: 'https://picsum.photos/600/600',
    url: '#', // 暂无链接
    title: 'Tree Select 树状多选 (计划中)',
    details: '用于从层级结构数据中选择一项或多项'
  },
]" />

### 数据展示 (Data Display)

用于呈现结构化数据的组件。

<ComponentGrid :componentList="[
  {
    img: 'https://picsum.photos/600/600',
    url: '/components/avatar',
    title: 'Avatar 头像',
    details: '用于展示用户或对象的缩略图'
  },
  {
    img: 'https://picsum.photos/600/600',
    url: '/components/table',
    title: 'Table 表格',
    details: '用于展示行列数据'
  },
  {
    img: 'https://picsum.photos/600/600',
    url: '/components/paging',
    title: 'Paging 分页',
    details: '用于对大量数据进行分页展示'
  },
]" />

### 反馈 (Feedback)

向用户传达状态或操作结果的组件。

<ComponentGrid :componentList="[
  {
    img: 'https://picsum.photos/600/600',
    url: '/components/modal',
    title: 'Modal 对话框',
    details: '用于需要用户响应的操作或信息展示'
  },
  {
    img: 'https://picsum.photos/600/600',
    url: '/components/toast',
    title: 'Toast 消息提示',
    details: '用于显示轻量级的操作反馈信息'
  },
  {
    img: 'https://picsum.photos/600/600',
    url: '/components/skeleton',
    title: 'Skeleton 骨架屏',
    details: '在数据加载时提供占位效果'
  },
]" />

### 主题 (Theme)

与应用主题和样式相关的组件。

<ComponentGrid :componentList="[
  {
    img: 'https://picsum.photos/600/600',
    url: '/components/themeController',
    title: 'ThemeController 主题控制器',
    details: '用于切换应用的主题样式'
  },
]" />


