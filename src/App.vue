<template>
    <div id="app">
        <vLogin v-if="!LOGGED"/>
        <vMainWrapper v-if="LOGGED"/>
        <vLoader v-show="SHOW_LOADER"/>
    </div>
</template>

<script>
    import vMainWrapper from './components/v-main-wrapper'
    import vLogin from "./components/v-login"
    import vLoader from "./components/v-loader"
    import {mapGetters} from 'vuex'

    export default {
        name: 'App',
        components: {
            vMainWrapper,
            vLogin,
            vLoader
        },
        computed: {
            ...mapGetters([
                'LOGGED',
                'SHOW_LOADER'
            ]),
        },
    }
</script>

<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
