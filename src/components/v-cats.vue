<template>
    <div class="v-cats">
        <p>Здесь будут категории</p>
        <!--        <vCatsItem-->
        <!--                v-for="cat in CATS"-->
        <!--                :key="cat.ean"-->
        <!--                :cat_data="cat"-->
        <!--        />-->
        <div class="test">

            <select v-model="selected" @change="catChanged">
                <option disabled value="">Выберите один из вариантов</option>
                <option
                        v-for="cat in CATS"
                        v-bind:value="cat.ean"
                        v-bind:key="cat.ean"
                >
                    {{ cat.name }}
                </option>
            </select>
            <span>Выбрано: {{ selected }}</span>


        </div>
    </div>
</template>

<script>
    // import vCatsItem from './v-cats-item'
    import {mapActions, mapGetters} from 'vuex'

    export default {
        name: "v-cats",
        data() {
            return {
                selected: '',
                previosSelected: ''
            }
        },
        components: {
            // vCatsItem
        },
        computed: {
            ...mapGetters([
                'CATS',
                'PRODUCTS',
                'HAS_CHANGED_PRODUCTS'
            ]),
        },
        watch: {
            // selected(ean, previosEan) {
            //     console.log('ean: ', ean);
            //     console.log('previosEan: ', previosEan);
            //     let hasChanged = this.PRODUCTS.some(value => value.changed === true);
            //     if (hasChanged) {
            //         let isProceed = confirm('На странице есть измененные элементы. Если Вы продолжите, они будут сброшены. Продолжить?');
            //         if (!isProceed) {
            //             this.selected = previosEan;
            //             return
            //         }
            //     }
            //     this.GET_PRODUCTS_FROM_API(ean);
            // }
        },
        methods: {
            ...mapActions([
                'GET_CATS_FROM_API',
                'GET_PRODUCTS_FROM_API'
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
                // console.log('e: ', e);
            }
        },
        mounted() {
            this.GET_CATS_FROM_API()
        }
    }
</script>

<style scoped>

</style>