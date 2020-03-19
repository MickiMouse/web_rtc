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
            component: () => import('@/views/Login'),
            meta: {
                title: 'Login',
                requiresAuth: false
            }
        },
        {
            path: '/main',
            name: 'main',
            component: () => import('@/views/Friends'),
            meta: {
                title: 'Main',
                requiresAuth: true
            }
        },
        {
            path: '/chat/:id',
            name: 'chat',
            component: () => import('@/views/Chat'),
            meta: {
                title: 'Chat',
                requiresAuth: true
            }
        },
    ]
})