<template>
    <v-content>
        <v-container fluid fill-height>
            <v-layout align-center justify-center>
                <v-flex xs12 sm8 md4>
                    <v-card>
                        <v-card-title class="justify-space-between">
                            <v-btn icon fab @click="back">
                                <v-icon>keyboard_backspace</v-icon>
                            </v-btn>
                            <v-subheader>Chat</v-subheader>
                        </v-card-title>
                        <v-card-text>
                            <v-list ref="chat"
                                    id="logs"
                                    two-line
                                    flat
                                    shaped
                            >
                                <template v-for="(item, index) in messages">
                                    <div class="message-wrapper" :class="{'message-self': item.user === id}" :key="index">
                                        <div class="message"
                                             v-if="item"
                                             :key="index"
                                        >
                                            {{ item.text }}
                                        </div>
                                    </div>
                                </template>
                            </v-list>
                        </v-card-text>
                        <v-card-actions class="align-end">
<!--                            <v-text-field class="align-end"-->
<!--                                          v-model="msg"-->
<!--                                          label="Write message..."-->
<!--                                          solo-->
<!--                                          outlined-->
<!--                                          v-on:keyup.enter="submit"-->
<!--                            />-->
                            <v-textarea v-model="msg"
                                        solo
                                        label="Write message..."
                                        outlined
                                        auto-grow
                                        clearable
                                        clear-icon="close"
                                        v-on:keyup.enter="submit"
                            />
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </v-content>
</template>

<script>
    export default {
        name: "Chat",
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
    #logs {
        height: 600px;
        overflow: auto;
        display: flex;
        justify-content: flex-start;
        flex-direction: column;
    }
    .message {
        padding: 5px;
        width: fit-content;
        min-height: 32px;
        max-width: 75%;
        word-break: break-word;
        overflow: hidden;
        margin: 3px 0;
        border: 2px solid black;
        border-radius: 10px;
        color: black;
        background-color: #eaeaea;
    }
    .message-wrapper {
        display: flex;
        justify-content: flex-start;
    }
    .message-self {
        justify-content: flex-end;
    }
</style>