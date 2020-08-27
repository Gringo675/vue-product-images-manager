<template>
    <div class="v-main-wrapper">
        <p>{{title}}</p>
        <vCats />
        <vCatalog />

    </div>
</template>

<script>
    import vCatalog from './v-catalog'
    import vCats from'./v-cats'

    export default {
        name: 'v-main-wrapper',
        components: {
            vCatalog,
            vCats
        },
        props: {},
        data() {
            return {
                title: 'Main wrapper'
            }
        },
        computed: {},
        methods: {},
        watch: {},
        mounted() {
            console.log('v-main-wrapper is ready!')
        }
    }
</script>

<style>
    .v-main-wrapper {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        max-width: 900px;
        margin: 0 auto;
    }
</style>