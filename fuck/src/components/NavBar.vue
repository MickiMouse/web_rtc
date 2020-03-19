<template>
    <nav>
        <v-app-bar color="#3a4052" flat dark>
            <v-icon :disabled="!$store.getters.loggedIn" left @click="drawer = !drawer">menu</v-icon>
            <v-toolbar-title class="text-uppercase display-1">social-network motherfucker</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn v-if="$store.getters.loggedIn" icon @click="logout">
                <v-icon>power_settings_new</v-icon>
            </v-btn>
        </v-app-bar>

        <v-navigation-drawer v-model="drawer"
                             app
                             absolute
                             temporary
                             color="#454d61"
        >
            <v-list color="#726bfa" dark>
                <v-list-item two-line>
                    <v-list-item-avatar>
                        <img src="https://randomuser.me/api/portraits/men/81.jpg" alt="avatar">
                    </v-list-item-avatar>
                    <v-list-item-content>
                        <v-list-item-title>Username</v-list-item-title>
                        <v-list-item-subtitle>Subtext</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
<!--            <template v-slot:append>-->
<!--                <div class="pa-2">-->
<!--                    <v-btn block>Logout</v-btn>-->
<!--                </div>-->
<!--            </template>-->
        </v-navigation-drawer>
    </nav>
</template>

<script>
    import axios from 'axios';

    export default {
        name: "ToolBar",
        data: () => ({
            drawer: false
        }),
        methods: {
            logout() {
                axios.delete('logout/')
                    .then(response => {
                       if (response.status === 204) {
                           this.$cookie.delete('token');
                           this.$cookie.delete('id');
                           this.$store.commit('removeToken');
                           delete axios.defaults.headers.common['Authorization'];
                       }
                    })
                    .catch(error => {console.log(error)})
                    .finally(() => {this.$router.push('/login')});
            }
        }
    }
</script>
