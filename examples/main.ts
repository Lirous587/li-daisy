import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// 再导入组件库样式
import { LiDaisy } from '../packages/index'
import '../dist/style.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
// 全局注册组件
app.use(LiDaisy)

app.mount('#app')
