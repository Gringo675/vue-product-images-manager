<template>
    <div class="v-cats-item">
        <span class="cat-ean">{{cat_data.ean}}</span>
        <span class="cat-name"
              @click="GET_PRODUCTS_FROM_API(cat_data.ean)"
        >{{cat_data.name}}</span>
    </div>
</template>

<script>
    import {mapActions} from 'vuex'
    export default {
        name: "v-cats-item",
        props: {
            cat_data: {
                type: Object,
                default() {
                    return {}
                }
            }
        },
        methods: {
            ...mapActions([
                'GET_PRODUCTS_FROM_API'
            ]),
            eanToConsole() {
                console.log(this.cat_data.ean);
            }
        },


    }
</script>

<style>
    .v-cats-item {
        margin: 10px 0;
    }
    .cat-name {
        padding: 0 20px;
        cursor: pointer;
        font-weight: bold;
        color: blue;
    }
</style>