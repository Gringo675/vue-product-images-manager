<template>
    <div class="v-catalog">
        <h1>Каталог</h1>
        <vCatalogItem
                v-for="product in PRODUCTS"
                :key="product.name"
                :product_data="product"
                @sendProductName="showNameInConsole"
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
                // products: [
                //     {
                //         name: "ProductName1",
                //         image: "image1"
                //     },
                //     {
                //         name: "ProductName2",
                //         image: "image3"
                //     },
                //     {
                //         name: "ProductName3",
                //         image: "image3"
                //     }
                // ]
            }
        },
        computed: {
            ...mapGetters([
                'PRODUCTS'
            ]),
        },
        methods: {
            ...mapActions([
                'GET_PRODUCTS_FROM_API'
            ]),
            showNameInConsole(data) {
                console.log(data)
            }
        },
        mounted() {
            // this.GET_PRODUCTS_FROM_API()
            //     .then((response) => {
            //     if (response.data) {
            //         console.log('Data arrived')
            //     } else {
            //         console.log('Data delivery error')
            //     }
            // })
        },
        watch: {
            // PRODUCTS() {
            //     console.log('product_data changed!');
            // }
        },
    }
</script>

<style scoped>

</style>