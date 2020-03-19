<template>
<!--    <v-content>-->
<!--        <v-container fluid fill-height>-->
            <v-layout align-center justify-center>
                <v-flex xs12 sm8 md6>
                    <v-card tile
                            style="background-color: #353b4c;"
                    >
                        <v-card-title class="justify-space-between">
                            <v-btn icon dark fab @click="back">
                                <v-icon>keyboard_backspace</v-icon>
                            </v-btn>
                            <v-btn icon dark fab>
                                <v-icon>more_vert</v-icon>
                            </v-btn>
                        </v-card-title>
                        <v-card-text style="padding: 0 !important;">
                            <v-list ref="chat"
                                    id="chat"
                                    two-line
                                    flat
                                    shaped
                            >
                                <template v-for="(item, index) in messages">
                                    <div class="message-wrapper" :class="{'message-self': item.user === id}" :key="index">
                                        <div class="message"
                                             :class="{'message-user': item.user === id}"
                                             v-if="item"
                                             :key="index"
                                        >
                                            {{ item.text }}
                                        </div>
                                    </div>
                                </template>
                            </v-list>
                        </v-card-text>
                        <div class="enter-message">
                            <div class="emoji">
                                <v-btn icon>
                                    <v-icon color="#71798f" large>sentiment_satisfied</v-icon>
                                </v-btn>
                            </div>
                            <div class="type_message">
                            </div>
                        </div>
                    </v-card>
                </v-flex>
            </v-layout>
<!--        </v-container>-->
<!--    </v-content>-->
</template>

<script>
    export default {
        name: "Chat",
        props: {
            user: {
                type: Object
            }
        },
        data() {
            return {
                msg: null
            }
        },
        computed: {
            messages() {
                return this.$store.getters.getDialog
            },
            id() {
                return parseInt(this.$cookie.get('id'))
            }
        },
        methods: {
            handlerConnect() {
                this.$store.dispatch('connect', this.$route.params.id);
            },
            submit() {
                if (this.msg) {
                    this.$store.getters.getSocket.send(this.msg);
                    this.msg = null;
                }
            },
            back() {
                this.$store.commit('clearDialog');
                this.$router.go(-1)
            }
        },
        watch: {
            messages() {
                setTimeout(() => {
                    this.$refs.chat.$el.scrollTop = this.$refs.chat.$el.scrollHeight;
                }, 0);
            },
            msg() {
                setTimeout(() => {
                    this.$refs.chat.$el.scrollTop = this.$refs.chat.$el.scrollHeight;
                }, 0);
            }
        },
        mounted() {
            this.handlerConnect();
        },
        destroyed() {
            this.$store.getters.getSocket.close()
        }
    }
</script>

<style scoped>
    #chat {
        height: 600px;
        overflow: auto;
        display: flex;
        justify-content: flex-start;
        flex-direction: column;
        background-color: #353b4c;
        padding: 0 !important;
        /*margin-bottom: 50px;*/
    }
    #chat::-webkit-scrollbar {
        display: none;
    }
    .message {
        /* top right bottom left */
        padding: 20px;
        width: fit-content;
        min-height: 32px;
        max-width: 75%;
        word-break: break-word;
        overflow: hidden;
        margin: 10px 20px 10px 20px;
        border-radius: 0 20px 20px 20px;
        font-size: 16px;
        color: #e4e9f7;
        background-color: #454d61;
    }
    .message-wrapper {
        display: flex;
        justify-content: flex-start;
    }
    .message-self {
        justify-content: flex-end;
    }
    .message-user {
        background-color: #726bfa;
        border-radius: 20px 0 20px 20px;
    }
    .enter-message {
        background-color: #3a4052;
        height: 100px;
        display: flex;
    }
    .emoji {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        max-width: 100px;
        flex-grow: 1;
    }
    .type_message {
        flex-grow: 3;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>