<template>
    <v-card>
        <v-list id="chat" color="#353b4c" dark>
            <template v-for="user in users">
                <v-list-item two-line
                             :key="user.id"
                             @click="handlerRoute(user.id)"
                >
                    <v-list-item-avatar>
                        <img :src="`https://randomuser.me/api/portraits/men/${user.id}.jpg`" alt="avatar">
                    </v-list-item-avatar>
                    <v-list-item-content>
                        <v-list-item-title>{{user.username}}</v-list-item-title>
                        <v-list-item-subtitle>{{user.id}}</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
            </template>
        </v-list>
    </v-card>
</template>

<script>
    import axios from "axios";

    export default {
        name: "ChatWindow",
        data: () => ({
            users: []
        }),
        methods: {
            handlerRoute(e) {
                this.$router.push(`/chat/${e}`)
            },
            getUsers() {
                axios.get('friends/')
                    .then(response => {
                        console.log(response.data);
                        this.users = response.data;
                    })
                    .catch(error => {
                        console.log(error)
                    })
            }
        },
        mounted() {
            this.getUsers()
        }
    }
</script>

<style scoped>
    #chat {
        height: 600px;
        overflow-y: auto;
    }
</style>