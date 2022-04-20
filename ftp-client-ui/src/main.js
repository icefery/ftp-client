import { createApp } from 'vue'
import naive from 'naive-ui'
import Antd from 'ant-design-vue'
import App from './App.vue'
import 'ant-design-vue/dist/antd.css'

const app = createApp(App)
app.use(naive)
app.use(Antd)
app.mount('#app')
