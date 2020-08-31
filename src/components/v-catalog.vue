<template>
    <div class="v-catalog">
        <h1>Каталог</h1>
        <div>checkedImgs: {{checkedImgs}}</div>
        <vCatalogItem
                v-for="product in PRODUCTS"
                :key="product.name"
                :product_data="product"
                @productChanged="productChanged"
                @checkedImgsChanged="checkedImgsChanged"
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
                checkedImgs: [],
                arrtest: []
            }
        },
        computed: {
            ...mapGetters([
                'PRODUCTS'
            ]),
        },
        methods: {
            ...mapActions([
                'GET_PRODUCTS_FROM_API',
                'SET_PRODUCT_TO_CHANGED'
            ]),
            productChanged(product) {
                this.SET_PRODUCT_TO_CHANGED(product);
            },
            checkedImgsChanged(itemSelectedImages) {

                let isItemExist = false;
                    this.checkedImgs.forEach(function (item, i, arr) {
                        if (item.ean === itemSelectedImages.ean) {
                            isItemExist = true;
                            arr[i].images = itemSelectedImages.images;
                        }
                    });
                    if (!isItemExist) {
                        this.checkedImgs.push(itemSelectedImages);
                    }
            }
        },
        mounted() {

        },
        watch: {},
    }
</script>

<style scoped>

</style>