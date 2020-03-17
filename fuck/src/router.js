import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/', redirect: 'main'
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('@/components/Login'),
            meta: {
                title: 'Login',
                requiresAuth: false
            }
        },
        {
            path: '/main',
            name: 'main',
            component: () => import('@/components/Main'),
            meta: {
                title: 'Main',
                requiresAuth: true
            }
        },
        {
            path: '/chat/:id',
            name: 'chat',
            component: () => import('@/components/Chat'),
            meta: {
                title: 'Chat',
                requiresAuth: true
            }
        },
    ]
})