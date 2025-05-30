import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

import axios from 'axios'
import VueAxios from 'vue-axios'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

createApp(App).use(createPinia()).use(router).use(VueAxios, axios).use(ElementPlus).mount('#app')
