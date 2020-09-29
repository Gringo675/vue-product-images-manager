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

        </div>
        <div class="product-image"
             v-for="(image, index) in product_data.images"
             :key="image.file"
        >
            <img
                    :src='HOST + "/components/com_jshopping/files/img_products/" + image.file'
                    :alt='image.name'
                    @click="openLightbox(product_data.images, index)"
            >

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
            return {
            }
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
            // openLightbox(images, index) {
            //     this.lightbox_data = {
            //         images: images,
            //         index: index
            //     };
            //     this.isLightboxVisible = true;
            // },
            // closeLightbox() {
            //     this.isLightboxVisible = false;
            // }
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
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 5px;
    margin-bottom: 20px;
    box-sizing: border-box;



}
</style>