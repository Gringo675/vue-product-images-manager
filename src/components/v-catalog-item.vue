<template>
    <div class="v-catalog-item clearfix">
        <div class="product clearfix">
            <div class="product-name">
                <label
                        :for='product_data.ean'>
                    {{product_data.name}}
                </label>
                <input type="checkbox"
                       :id='product_data.ean'
                       :value='product_data.ean'
                       v-model="product_data.checked">

            </div>
            <div class="product-image"
                 v-for="(image, index) in product_data.images"
                 :key="image.file"
            >
                <label
                        :for='product_data.ean + "_" + image.file'>
                    <img
                            :src='"https://test.chelinstrument.ru/components/com_jshopping/files/img_products/" + image.file'
                            :alt='image.name'
                    >
                </label>
                <input type="checkbox"
                       :id='product_data.ean + "_" + image.file'
                       :value='image.file'
                       v-model="product_data.itemCheckedImgs">

                <button
                        v-if="index !== 0"
                        @click="moveLeft(index)"
                >
                    &#8592;
                </button>
                <button
                        v-if="index !== product_data.images.length-1"
                        @click="moveRight(index)"
                >
                    &#8594;
                </button>
            </div>
        </div>
        <div class="checkedImgs clearfix">checkedImgs: {{ product_data.itemCheckedImgs }}</div>
    </div>
</template>

<script>
    import {mapActions} from 'vuex'

    export default {
        name: "v-catalog-item",
        props: {
            product_data: {
                type: Object,
                default() {
                    return {}
                }
            }
        },
        data() {
            return {

            }
        },
        methods: {
            ...mapActions([
                'SET_SELECTED_IMAGES_TO_PRODUCTS',
                'MOVE_IMAGE_IN_PRODUCT',
                'SET_PRODUCT_CHECKED_VALUE'
            ]),
            moveLeft(index) {
                 let product = {
                    'index': this.product_data.index,
                    'imageIndex': index,
                    'direction': 'left'
                };
                this.MOVE_IMAGE_IN_PRODUCT(product);
            },
            moveRight(index) {
                let product = {
                    'index': this.product_data.index,
                    'imageIndex': index,
                    'direction': 'right'
                };
                this.MOVE_IMAGE_IN_PRODUCT(product);
            },
        },
        watch: {
            'product_data.itemCheckedImgs'(checked) {
                // console.log('product_data: ', this.product_data);
                let product = {
                    'index': this.product_data.index,
                    'checkedImages': checked
                };
                this.SET_SELECTED_IMAGES_TO_PRODUCTS(product);
                      // console.log(checkedID);
            },
            'product_data.checked'(value) {
                // console.log('product_data: ', this.product_data);
                let product = {
                    'index': this.product_data.index,
                    'checked': value
                };
                this.SET_PRODUCT_CHECKED_VALUE(product);
                // console.log(product);
            },
        },
    }
</script>

<style>
    .product div {
        float: left;
    }

    .product-image img {
        width: 70px;
    }

    .clearfix:after {
        content: "";
        display: table;
        clear: both;
    }

    .checkedImgs {
        margin: 20px 0;
        float: left;
    }
</style>