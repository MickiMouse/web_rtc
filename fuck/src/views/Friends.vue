<template>
    <v-layout row justify-center>
        <v-flex xs12 md6 lg6>
            <v-list id="people" color="#353b4c" dark>
                <template v-for="user in users">
                    <v-list-item two-line
                                 :key="user.id"
                                 @click="handlerRoute(user.id)"
                    >
                        <v-list-item-avatar>
                            <img :src="`https://randomuser.me/api/portraits/men/${user.id}.jpg`" alt="">
                        </v-list-item-avatar>
                        <v-list-item-content>
                            <v-list-item-title>
                                <span>{{user.username}}</span>
                            </v-list-item-title>
                            <v-list-item-subtitle>
                                <v-chip v-if="users_online.includes(user.id)" small
                                        color="#726bfa">online</v-chip>
                            </v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                </template>
            </v-list>

        </v-flex>
    </v-layout>
</template>

<script>
    import axios from "axios";

    export default {
        name: "ChatWindow",
        data: () => ({
            users: []
        }),
        computed: {
            users_online() {
                return this.$store.getters.getOnlineUsers;
            }
        },
        methods: {
            handlerConnect() {
                this.$store.dispatch('checker', this.$route.params.id);
            },
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
            this.handlerConnect();
            this.getUsers();
        }
    }
</script>

<style scoped>
    #people {
        height: 100%;
        overflow-y: auto;
    }
    #people::-webkit-scrollbar {
        display: none;
    }
</style>