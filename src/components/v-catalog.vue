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
                    @click="resetSelectedImages">
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
                'RESET_SELECTED_IMAGES',
                'DELETE_SELECTED_IMAGES',
                'SELECT_SAME_IMAGES'
            ]),
            resetSelectedImages() {
                this.RESET_SELECTED_IMAGES();
            },
            deleteSelectedImages() {
                this.DELETE_SELECTED_IMAGES();
            },
            selectSameImages() {
                this.SELECT_SAME_IMAGES();
            },
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
    }

    .buttons-block button {
        margin: 10px;
    }
</style>