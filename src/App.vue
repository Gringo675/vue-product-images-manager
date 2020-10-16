<template>
    <div id="app">
        <transition appear name="start" mode="out-in">
        <vLogin v-if="!LOGGED"/>
        <vMainWrapper v-else/>
        </transition>

         <vLoader v-show="SHOW_LOADER"/>
        <transition name="imageviewer">
        <vImageViewer v-if="SHOW_IMAGEVIEWER"/>
        </transition>
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
        font-size: 16px;
        color: #2c3e50;
        background: #ddf9ea;
        overflow-x: hidden;
        min-height: 100vh;
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

    input, label {
        cursor: pointer;
    }

    input:focus, select:focus {
        outline: none;
    }

    // transitions
    .holder_fade_collapse-enter-active, .holder_fade_collapse-leave-active {
        transition: all .5s ease-out;
        overflow: hidden;
    }

    .holder_fade_collapse-enter, .holder_fade_collapse-leave-to {
        max-height: 0;
        opacity: 0;
    }

    .holder_fade_collapse-enter-to, .holder_fade_collapse-leave {
        max-height: 522px;
    }

    .holder_toggle-enter-active, .holder_toggle-leave-active {
          transition: height .6s ease-out;
          overflow: hidden;
      }

    .holder_toggle-enter, .holder_toggle-leave-to {
        height: 0;
    }

    .holder_toggle-enter-to, .holder_toggle-leave {
        height: 39px;
    }
    .holder_toggle-enter-active .toggle, .holder_toggle-leave-active .toggle {
        transition: all .6s ease-out;
    }

    .holder_toggle-enter .toggle, .holder_toggle-leave-to .toggle {
        opacity: 0;
        transform: translate(0,  -39px);
    }

    .holder_toggle-enter-to .toggle, .holder_toggle-leave .toggle {
        opacity: 1;
    }

    .imageviewer-enter-active, .imageviewer-leave-active {
        transition: opacity .5s linear;
    }

    .imageviewer-enter, .imageviewer-leave-to {
        opacity: 0;
    }

    .imageviewer-enter-active .wrapper, .imageviewer-leave-active .wrapper {
        transition: transform .5s linear;
    }

    .imageviewer-enter .wrapper, .imageviewer-leave-to .wrapper {
        transform: scale(.3);
    }

    .start-enter-active.v-login, .start-leave-active.v-login {
        transition: all .5s linear;
    }

    .start-enter.v-login, .start-leave-to.v-login {
        transform: translateY(-200px);
        opacity: 0;
    }
    .start-enter-active.v-main-wrapper {
        transition: all .5s linear;
    }

    .start-enter.v-main-wrapper {
        transform: scale(.7);
        opacity: 0;
    }

</style>
