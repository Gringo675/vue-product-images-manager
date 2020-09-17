<template>
    <div class="v-catalog">
        <h1>Каталог</h1>
        <div class="filter">
            <span>Фильтр: </span>
            <span class="filter-element"
                  v-for="brand in PRODUCTS_BRANDS"
                  :key="brand">
                <label
                        :for='brand'>
                    {{brand}}
                </label>
                 <input type="checkbox"
                        :id='brand'
                        :value='brand'
                        v-model="checkedBrands"
                 @change="FILTER_PRODUCTS(checkedBrands)">
            </span>
        </div>
        <vCatalogItem
                v-for="product in PRODUCTS"
                v-show="product.show"
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
            <button
                    v-if="HAS_CHANGED_PRODUCTS"
                    @click="SAVE_CHANGED_PRODUCTS_ON_SERVER">
                Сохранить
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
            return {
                checkedBrands: []
            }
        },
        computed: {
            ...mapGetters([
                'PRODUCTS',
                'HAS_CHANGED_PRODUCTS',
                'PRODUCTS_BRANDS'
            ]),
        },
        methods: {
            ...mapActions([
                'RESET_SELECTED_PRODUCTS_AND_IMAGES',
                'DELETE_SELECTED_IMAGES',
                'SELECT_SAME_IMAGES',
                'SET_IMAGES_TO_IMAGEBOX',
                'SAVE_CHANGED_PRODUCTS_ON_SERVER',
                'FILTER_PRODUCTS'
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
            },
        },
        mounted() {

        },
        watch: {
            'PRODUCTS_BRANDS'(newValue) {
                this.checkedBrands = newValue
            }
        },
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