<template>
    <div class="t-parent">
        <h2>ТЕСТОВЫЙ БЛОК</h2>
        <h3>Parent</h3>
        <tChild
                v-for="arrtest in arrtests"
                :key="arrtest.ean"
                :item="arrtest"
        />
        <button
                @click="buttonClick">
            Кнопка
        </button>
    </div>
</template>

<script>
    import tChild from './t-child'

    export default {
        name: "t-parent",
        components: {
            tChild
        },
        data() {
            return {
                arrtests: {
                    item1: {
                        ean: '111111',
                        name: 'item1',
                        images: {
                            image1: {
                                id: '11',
                                name: 'image1'
                            },
                            image2: {
                                id: '22',
                                name: 'image2'
                            },
                            image3: {
                                id: '33',
                                name: 'image3'
                            }
                        },
                        checked: ["11", "22"]
                    }
                }
            }
        },
        methods: {
            buttonClick() {
                this.arrtests.item1.checked = [];
             }
        },
    }
</script>

<style>
.t-parent {
    margin-top: 100px;

}
</style>