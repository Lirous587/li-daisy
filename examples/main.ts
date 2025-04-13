import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// 直接从源码导入，不依赖构建文件
import LiDaisyComponents from '../packages'
// 如果有style.css文件
// import '../dist/style.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
// 全局注册组件
app.use(LiDaisyComponents)

app.mount('#app')
