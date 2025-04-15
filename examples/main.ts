import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import '@/assets/css/tailwind.css'

import * as LiDaisy from '../packages/index.ts'

const app = createApp(App)

app.use(createPinia())
app.use(router)

// 全局注册组件
Object.entries(LiDaisy).forEach(([name, component]) => {
  app.component(name, component)
})

app.mount('#app')
