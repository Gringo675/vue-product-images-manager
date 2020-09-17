<template>
    <div class="v-loader-container">
        <div class="loader"></div>
    </div>
</template>

<script>

    export default {
        name: "v-loader",
        components: {},
        data() {
            return {}
        },
        methods: {},
        computed: {},
        watch: {},
        mounted() {
        }
    }
</script>

<style>
    .v-loader-container {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 1040;
        background-color: #000;
        opacity: .8;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        cursor: progress;
    }
    .loader {
        border: 16px solid #f3f3f3;
        border-radius: 50%;
        border-top: 16px solid blue;
        border-right: 16px solid green;
        border-bottom: 16px solid red;
        border-left: 16px solid pink;
        width: 120px;
        height: 120px;
        -webkit-animation: spin 2s linear infinite;
        animation: spin 2s linear infinite;
    }

    @-webkit-keyframes spin {
        0% { -webkit-transform: rotate(0deg); }
        100% { -webkit-transform: rotate(360deg); }
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }

</style>