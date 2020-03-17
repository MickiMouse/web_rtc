<template>
    <v-toolbar dark>
        <v-toolbar-title>Sockets</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon
               @click="logout">
            <v-icon>power_settings_new</v-icon>
        </v-btn>
    </v-toolbar>
</template>

<script>
    import axios from 'axios';

    export default {
        name: "ToolBar",
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
                    .catch(error => {
                        console.log(error)
                    })
                    .finally(() => {
                        this.$router.push('/login')
                    });
            }
        }
    }
</script>

<style scoped>

</style>