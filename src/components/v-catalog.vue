<template>
    <div class="v-catalog">
        <h1>Каталог</h1>
        <vCatalogItem
                v-for="product in PRODUCTS"
                :key="product.ean"
                :product_data="product"
        />
        <div class="buttons-block">
            <button
                    @click="resetSelectedProductsAndImages">
                Сбросить
            </button>
            <button
                    @click="deleteSelectedImages">
                Удалить
            </button>
            <button
                    @click="selectSameImages">
                Аналоги
            </button>
            <button
                    @click="toImagebox">
                В выбранные
            </button>
        </div>
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
                'PRODUCTS'
            ]),
        },
        methods: {
            ...mapActions([
                'RESET_SELECTED_PRODUCTS_AND_IMAGES',
                'DELETE_SELECTED_IMAGES',
                'SELECT_SAME_IMAGES',
                'SET_IMAGES_TO_IMAGEBOX'
            ]),
            resetSelectedProductsAndImages() {
                this.RESET_SELECTED_PRODUCTS_AND_IMAGES();
            },
            deleteSelectedImages() {
                this.DELETE_SELECTED_IMAGES();
            },
            selectSameImages() {
                this.SELECT_SAME_IMAGES();
            },
            toImagebox() {
                this.SET_IMAGES_TO_IMAGEBOX();
            }
        },
        mounted() {

        },
        watch: {},
    }
</script>

<style>
    .buttons-block {
        position: fixed;
        top: 40px;
        left: 40px;
        width: 200px;
    }

    .buttons-block button {
        margin: 10px;
    }
</style>