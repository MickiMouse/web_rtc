<template>
    <v-app dark>
        <NavBar/>
        <v-content>
            <v-container fluid>
                <router-view/>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
    import NavBar from "@/components/NavBar";
    export default {
        name: 'App',
        components: {NavBar}
    }
</script>

<style>
    #main {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
    #app {
        background-color: #454d61;
    }
</style>
