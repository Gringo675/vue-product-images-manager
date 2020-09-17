<template>
    <div class="v-main-wrapper">
        <p>{{title}}</p>
        <vCats/>
        <vCatalog/>
        <vImagebox/>
        <vServerImages/>
        <tParent/>

    </div>
</template>

<script>
    import vCatalog from './v-catalog'
    import vCats from './v-cats'
    import vImagebox from './v-imagebox'
    import vServerImages from './v-server-images'
    import tParent from './test/t-parent'

    export default {
        name: 'v-main-wrapper',
        components: {
            vCatalog,
            vCats,
            vImagebox,
            vServerImages,
            tParent
        },
        props: {},
        data() {
            return {
                title: 'Main wrapper'
            }
        },
        computed: {
        },
        methods: {},
        watch: {},
        mounted() {
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