<template>
    <div class="v-catalog">
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
            return {}
        },
        computed: {
            ...mapGetters([
                'PRODUCTS',
            ]),
        },
        methods: {
            ...mapActions([]),
        },
        mounted() {

        },
        watch: {},
    }
</script>

<style lang="scss">
    .v-catalog {
        margin: 10px 30px;
    }


</style>