<template>
    <div id="app">
        <vLogin v-if="!LOGGED"/>
        <vMainWrapper v-else/>
        <vLoader v-show="SHOW_LOADER"/>
        <vImageViewer v-if="SHOW_IMAGEVIEWER"/>
    </div>
</template>

<script>
    import vMainWrapper from './components/v-main-wrapper'
    import vLogin from "./components/v-login"
    import vLoader from "./components/v-loader"
    import vImageViewer from "./components/v-image-viewer"
    import {mapGetters} from 'vuex'

    export default {
        name: 'App',
        components: {
            vMainWrapper,
            vLogin,
            vLoader,
            vImageViewer
        },
        computed: {
            ...mapGetters([
                'LOGGED',
                'SHOW_LOADER',
                'SHOW_IMAGEVIEWER'
            ]),
        },
    }
</script>

<style lang="scss">
    @import '@/scss/reset';
    @import url('https://fonts.googleapis.com/css2?family=Play:wght@400;700&display=swap');

    #app {
        font-family: 'Play', sans-serif;;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        font-size: 16px;
        color: #2c3e50;
        background: #ddf9ea;
    }

    button {
        &:focus {
            outline: none;
        }
        &:not(.unactive) {
            cursor: pointer;
        }
    }

    .btn-close {
        width: 40px;
        height: 40px;
        border-radius: 40px;
        position: absolute;
        top: 10px;
        right: 20px;
        z-index: 1;
        cursor: pointer;
    }

    .btn-close:before {
        content: '+';
        color: #337AB7;
        position: absolute;
        z-index: 2;
        transform: rotate(45deg);
        font-size: 50px;
        line-height: 1;
        top: -5px;
        left: 6px;
        transition: all 0.3s cubic-bezier(0.77, 0, 0.2, 0.85);
    }

    .btn-close:after {
        content: '';
        position: absolute;
        top: 1px;
        left: -2px;
        width: 100%;
        height: 100%;
        border-radius: 100%;
        background: #337AB7;
        z-index: 1;
        transition: all 0.3s cubic-bezier(0.77, 0, 0.2, 0.85);
        transform: scale(0.01);
    }

    .btn-close:hover:after {
        transform: scale(1);
    }

    .btn-close:hover:before {
        transform: scale(0.8) rotate(45deg);
        color: #fff;
    }


</style>
