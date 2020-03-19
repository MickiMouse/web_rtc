import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        socket: null,
        token: null,
        dialog: []
    },
    mutations: {
        CONNECT(state, sock) {
            state.socket = sock
        },
        setToken(state, token) {
            state.token = token
        },
        removeToken(state) {
            state.token = null
        },
        setDialog(state, arr) {
            state.dialog = arr
        }
    },
    getters: {
        getSocket(state) {
            return state.socket
        },
        connected(state) {
            return state.socket !== null
        },
        loggedIn(state) {
            return state.token !== null
        },
        getToken(state) {
            return state.token
        },
        getDialog(state) {
            return state.dialog
        }
    },
    actions: {
        connect({commit}, id) {
            let socket = new WebSocket(
                `ws://192.168.0.7:8000/ws/conversation/${Vue.cookie.get('token')}/${id}/`
            );
            commit('CONNECT', socket);
            socket.onmessage = function (e) {
                console.log(JSON.parse(e.data));
                commit('setDialog', JSON.parse(e.data));
            };
            socket.onopen = function (e) {
                console.log(e)
            };
            socket.onclose = function (e) {
                console.log(e)
            }
        }
    }
})
