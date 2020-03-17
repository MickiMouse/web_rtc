<template>
    <v-container>
        <v-card dark>
            <v-card-title>Sign in</v-card-title>
            <v-card-text>
                <v-text-field v-model="username"
                              label="Username"
                />
                <v-text-field v-model="password"
                              type="password"
                              label="Password"
                />
            </v-card-text>
            <v-card-actions>
                <v-btn @click="login">Sign in</v-btn>
            </v-card-actions>
        </v-card>
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
                        console.log(response.data);
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