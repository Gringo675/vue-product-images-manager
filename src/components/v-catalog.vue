<template>
    <div class="v-catalog">
        <h1>Каталог</h1>
        <vCatalogItem
                v-for="product in PRODUCTS"
                v-show="product.show"
                :key="product.ean"
                :product_data="product"
        />
    </div>
</template>

<script>
    import vCatalogItem from './v-catalog-item'
    import {mapActions, mapGetters} from 'vuex'

    export default {
        name: "v-catalog",
        components: {
            vCatalogItem
        },
        data() {
            return {

            }
        },
        computed: {
            ...mapGetters([
                'PRODUCTS',
             ]),
        },
        methods: {
            ...mapActions([

            ]),
        },
        mounted() {

        },
        watch: {
        },
    }
</script>

<style>

</style>