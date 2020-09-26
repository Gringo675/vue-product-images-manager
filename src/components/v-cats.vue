<template>
    <div class="v-cats">
        <div class="select-block">

            <select v-model="selected" @change="catChanged">
                <option disabled value="">Выберите категорию</option>
                <option
                        v-for="cat in CATS"
                        v-bind:value="cat.ean"
                        v-bind:key="cat.ean"
                >
                    {{ cat.name }}
                </option>
            </select>
        </div>
        <div class="filter-block">
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
    </div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'

    export default {
        name: "v-cats",
        data() {
            return {
                selected: '',
                checkedBrands: []
            }
        },
        components: {},
        computed: {
            ...mapGetters([
                'CATS',
                'PRODUCTS',
                'HAS_CHANGED_PRODUCTS',
                'PRODUCTS_BRANDS'
            ]),
        },
        watch: {
            'PRODUCTS_BRANDS'(newValue) {
                this.checkedBrands = newValue
            }
        },
        methods: {
            ...mapActions([
                'GET_CATS_FROM_API',
                'GET_PRODUCTS_FROM_API',
                'FILTER_PRODUCTS'
            ]),
            catChanged() {
                if (this.HAS_CHANGED_PRODUCTS) {
                    let isProceed = confirm('На странице есть измененные элементы. Если Вы продолжите, они не будут сохранены. Продолжить?');
                    if (!isProceed) {
                        this.selected = this.previosSelected;
                        return
                    }
                }
                this.previosSelected = this.selected;
                this.GET_PRODUCTS_FROM_API(this.selected);
            }
        },
        mounted() {
            this.GET_CATS_FROM_API()
        }
    }
</script>

<style lang="scss">
    .v-cats {

        .select-block {
            margin-bottom: 10px;

            select {
                width: 400px;
                font-size: 16px;
                padding: 5px;
                border: 1px solid #ccc;
                border-radius: 5px;
            }
        }
        .filter-block {

            .filter-element {
                margin: 0 5px;
            }
        }
    }

</style>