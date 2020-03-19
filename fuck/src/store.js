import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        sock_checker: null,
        socket: null,
        token: null,
        dialog: [],
        users_online: []
    },
    mutations: {
        connect(state, sock) {
            state.socket = sock
        },
        connect_checker(state, sock) {
            state.sock_checker = sock
        },
        setToken(state, token) {
            state.token = token
        },
        removeToken(state) {
            state.token = null
        },
        setDialog(state, arr) {
            state.dialog = arr
        },
        setUsersId(state, ids) {
            state.users_online = ids
        },
        clearDialog(state) {
            state.dialog = []
        }
    },
    getters: {
        getSocket(state) {
            return state.socket
        },
        getChecker(state) {
            return state.sock_checker
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
        },
        getOnlineUsers(state) {
            return state.users_online
        }
    },
    actions: {
        connect({commit}, id) {
            let socket = new WebSocket(
                `ws://192.168.0.7:8000/ws/conversation/${id}/`
            );
            commit('connect', socket);
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
        },
        checker({commit}) {
            let sock_checker = new WebSocket(
                `ws://192.168.0.7:8000/ws/online/`
            );
            commit('connect_checker', sock_checker);
            sock_checker.onmessage = function (e) {
                console.log(JSON.parse(e.data));
                commit('setUsersId', JSON.parse(e.data));
            };
            sock_checker.onopen = function (e) {
                console.log(e)
            };
            sock_checker.onclose = function (e) {
                console.log(e)
            }
        }
    }
})
