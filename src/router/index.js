import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import LoginView from '../views/LoginView.vue'
import EmpsView from '../views/EmpsView.vue'
import uploadDownloadView from '../views/uploadDownloadView.vue'    


const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/about',
        name: 'about',
        // component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
        component: AboutView
    },
    {
        path: '/login',
        name: 'login',
        component: LoginView
    },
    {
        path:'/emps',
        name:'emps',
        component: EmpsView
    },
    {
        path:'/uploadAndDownload',
        name:'uploadAndDownload',
        component: uploadDownloadView
    },
   
    {
        path: '/xray-analysis',
        name: 'xray-analysis',
        component: () => import('../views/XrayAnalysis.vue')
    },
]

const router = createRouter({
    // history: createWebHistory(import.meta.url),
    history: createWebHistory(),
    routes
})

export default router
