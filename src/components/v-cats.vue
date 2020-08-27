<template>
    <div class="v-cats">
        <p>Здесь будут категории</p>
<!--        <vCatsItem-->
<!--                v-for="cat in CATS"-->
<!--                :key="cat.ean"-->
<!--                :cat_data="cat"-->
<!--        />-->
        <div class="test">

            <select v-model="selected">
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
            }
        },
        components: {
            // vCatsItem
        },
        computed: {
            ...mapGetters([
                'CATS'
            ]),
            // selectedToConsole() {
            //     console.log(this.selected);
            //     return this.selected;
            // }
        },
        watch: {
            selected(ean) {
                this.GET_PRODUCTS_FROM_API(ean);
            }
        },
        methods: {
            ...mapActions([
                'GET_CATS_FROM_API',
                'GET_PRODUCTS_FROM_API'
            ])
        },
        mounted() {
            this.GET_CATS_FROM_API()
                .then((response) => {
                    if (response.data) {
                        console.log('Data arrived')
                    } else {
                        console.log('Data delivery error')
                    }
                })
        }
    }
</script>

<style scoped>

</style>