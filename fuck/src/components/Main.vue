<template>
    <v-container>
        <tool-bar/>
        <friends :users="this.users"/>
    </v-container>
</template>

<script>
    import axios from 'axios';
    import ToolBar from "@/components/ToolBar";
    import Friends from "@/components/Friends";

    export default {
        name: "Main",
        components: {ToolBar, Friends},
        data() {
            return {
                users: [],
            }
        },
        methods: {
            getUsers() {
                axios.get('friends/')
                    .then(response => {
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

</style>