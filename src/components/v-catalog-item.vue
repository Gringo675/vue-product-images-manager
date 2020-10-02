<template>
    <div class="v-catalog-item">
        <div class="product-name">
            <label
                    :for='product_data.ean'>
                {{product_data.name}}
            </label>
            <input type="checkbox"
                   :id='product_data.ean'
                   :value='product_data.ean'
                   v-model="product_data.checked">
            <div class="product-ean">ID: {{product_data.ean}}</div>

        </div>
        <div class="product-image"
             v-for="(image, index) in product_data.images"
             :key="image.file"
        >
            <img
                    :src='HOST + "/components/com_jshopping/files/img_products/thumb_" + image.file'
                    :alt='image.name'
                    @click="createImageViewer(index)"
            >
            <div class="image-control">


                <button
                        v-if="index !== 0"
                        @click="moveLeft(index)"
                >
                    <i class="arrow left"></i>
                </button>
                <button
                        v-if="index !== product_data.images.length-1"
                        @click="moveRight(index)"
                >
                    <i class="arrow right"></i>
                </button>
                <input type="checkbox"
                       :id='product_data.ean + "_" + image.file'
                       :value='image.file'
                       v-model="product_data.itemCheckedImgs">
            </div>

        </div>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'

    export default {
        name: "v-catalog-item",
        components: {},
        props: {
            product_data: {
                type: Object,
                default() {
                    return {}
                }
            }
        },
        data() {
            return {}
        },
        computed: {
            ...mapGetters([
                'HOST',
            ])
        },
        methods: {
            ...mapActions([
                'SET_SELECTED_IMAGES_TO_PRODUCTS',
                'MOVE_IMAGE_IN_PRODUCT',
                'SET_PRODUCT_CHECKED_VALUE',
                'SET_IMAGEVIEWER'
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
            createImageViewer(index) {
                let aaa = JSON.parse(JSON.stringify(this.product_data.images)); // работает

                this.SET_IMAGEVIEWER({images: aaa, index})
            }
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

<style lang="scss">
    .v-catalog-item {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: flex-start;
        border: 1px solid #ccc;
        border-radius: 5px;
        padding: 10px;
        margin-bottom: 15px;
        background: #fff;
        box-shadow: 1px 2px #ccc;
        overflow: auto;

        .product-name {
            width: 400px;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            margin-top: 20px;
            padding: 5px;
            background: #edfff8;
            border-radius: 5px;
            flex-shrink: 0;
            position: sticky;
            left: 0;

            label {
                display: block;
                padding-right: 10px;
                flex-grow: 1;
            }

            input {
                display: block;
                width: 24px;
                height: 24px;
            }
        }

        .product-image {

            border: 1px solid #ccc;
            border-radius: 5px;
            margin-left: 20px;
            position: relative;

            img {
                display: block;
                width: 100px;
                margin: 5px;
                cursor: zoom-in;


                //&:hover {
                 //   transform: scale(1.5);
                 //   border: 1px solid red;
                 //   position: absolute;
                //}

            }

            .image-control {
                margin: 5px;
                display: flex;
                flex-direction: row;
                justify-content: flex-end;
                position: absolute;
                bottom: 0px;
                width: 100px;
                opacity: 0.6;

                &:hover {
                    opacity: 1;
                }

                input {
                    display: block;
                    width: 24px;
                    height: 24px;
                }

                button {
                    padding: 5px;
                    margin-right: 12px;
                    flex-grow: 1;

                    i.arrow {

                        &.left {
                            @include arrow(2px, 4px, #687adc, left);
                        }

                        &.right {
                            @include arrow(2px, 4px, #687adc, right);
                        }
                    }

                }
            }
        }

        input:hover, button:hover {
            box-shadow: 0 0 4px #abc3c2;
        }

    }
</style>