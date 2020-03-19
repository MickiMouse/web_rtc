<template>
    <v-container>
        <v-layout row justify-center>
            <v-flex xs12 md6 lg6>
                <v-text-field v-model="username"
                              solo dark
                              background-color="#726bfa"
                              label="Username"
                />
                <v-text-field v-model="password"
                              solo dark
                              background-color="#726bfa"
                              type="password"
                              label="Password"
                />
                <v-btn @click="login" dark color="#726bfa">Login</v-btn>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import axios from "axios";

    export default {
        name: "Login",
        data() {
            return {
                username: '',
                password: ''
            }
        },
        methods: {
            login() {
                const data = {username: this.username, password: this.password};
                axios.post('login/', data).then(response => {
                    if (response.status === 200) {
                        let t = response.data.token;
                        let id = response.data.id;
                        this.$cookie.set('token', t);
                        this.$cookie.set('id', id);
                        this.$store.commit('setToken', t);
                        axios.defaults.headers['Authorization'] = `Token ${t}`
                    }
                }).catch(error => {
                    console.log(error);
                }).finally(() => {this.$router.push('/main');});
            }
        }
    }
</script>

<style scoped>

</style>