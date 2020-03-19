import Vue from 'vue'
import App from './App.vue'
import axios from 'axios';
import VueCookie from "vue-cookie";
import vuetify from "@/plugins/vuetify";
import store from "@/store";
import router from "@/router";
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import WebRTC from 'vue-webrtc';

Vue.use(WebRTC);

axios.defaults.baseURL = 'http://192.168.0.7:8000/';  // Пока что так

Vue.use(VueCookie);
Vue.config.productionTip = false;

let token = Vue.cookie.get('token') || null;

if (token) {
    store.commit('setToken', token);
    axios.defaults.headers.common['Authorization'] = `Token ${token}`
}

axios.interceptors.response.use(response => {
    return Promise.resolve(response)
}, error => {
    if (error.response.status === 401) {
        delete axios.defaults.headers.common['Authorization'];
        Vue.cookie.delete('token');
        store.commit('removeToken');
        router.push('/login');
    }
    return Promise.reject(error)
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!store.getters.loggedIn) {
            console.log('redirect to login');
            next('login')
        } else {
            console.log('redirect to', to.name);
            next()
        }
    } else if (to.name === 'login' && store.getters.loggedIn){
        next('main')
    } else {
        next()
    }
});

new Vue({
    vuetify,
    router,
    store,
    render: h => h(App),
}).$mount('#app');
