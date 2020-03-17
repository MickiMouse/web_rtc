<template>
    <v-card class="my-3">
        <v-toolbar>
            <v-btn icon>
                <v-icon>menu</v-icon>
            </v-btn>

            <v-spacer></v-spacer>

            <v-btn icon>
                <v-icon>search</v-icon>
            </v-btn>
        </v-toolbar>
        <v-list three-line id="chat">
            <template v-for="user in users">
                <v-list-item :key="user.id"
                             @click="handlerRoute(user.id)"
                >
                    <v-list-item-content>
                        {{user.username}} {{user.id}}
                    </v-list-item-content>
                </v-list-item>

<!--                <v-subheader-->
<!--                        v-if="item.header"-->
<!--                        :key="item.header"-->
<!--                        v-text="item.header"-->
<!--                ></v-subheader>-->

<!--                <v-divider-->
<!--                        v-else-if="item.divider"-->
<!--                        :key="index"-->
<!--                        :inset="item.inset"-->
<!--                ></v-divider>-->

<!--                <v-list-item-->
<!--                        v-else-->
<!--                        :key="item.title"-->
<!--                        link=""-->
<!--                >-->
<!--                    <v-list-item-avatar>-->
<!--                        <v-img :src="item.avatar"></v-img>-->
<!--                    </v-list-item-avatar>-->

<!--                    <v-list-item-content>-->
<!--                        <v-list-item-title v-html="item.title"></v-list-item-title>-->
<!--                        <v-list-item-subtitle v-html="item.subtitle"></v-list-item-subtitle>-->
<!--                    </v-list-item-content>-->
<!--                </v-list-item>-->
            </template>
        </v-list>
    </v-card>
</template>

<script>
    export default {
        name: "ChatWindow",
        props: {
            users: Array
        },
        methods: {
            handlerRoute(e) {
                this.$router.push(`/chat/${e}`)
            }
        }
    }
</script>

<style scoped>
    #chat {
        height: 600px;
        overflow-y: auto;
    }
</style>