<template>
    <div class="v-catalog-item clearfix">
        <div class="product clearfix">
            <div class="product-name">{{product_data.name}}</div>
            <div class="product-image"
                 v-for="(image, index) in product_data.images"
                 :key="image.id"
            >
                <label
                        :for='image.id'>
                    <img
                            :src='"https://test.chelinstrument.ru/components/com_jshopping/files/img_products/" + image.file'
                            :alt='image.name'
                    >
                </label>
                <input type="checkbox"
                       :id='image.id'
                       :value='image.id'
                       v-model="itemCheckedImgs">

                <button
                        @click="deleteImage(index)"
                >
                    del
                </button>
            </div>
        </div>
        <div class="checkedImgs clearfix">checkedImgs: {{ itemCheckedImgs }}</div>
    </div>
</template>

<script>
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
                itemCheckedImgs: [],
            }
        },
        methods: {
            deleteImage(index) {
                // console.log(index);
                this.product_data.images.splice(index, 1);
                this.$emit('productChanged', this.product_data);
            }
        },
        watch: {
            itemCheckedImgs(imagesID) {
                let itemSelectedImages = {
                    ean: this.product_data.ean,
                    images: imagesID
                };
                this.$emit('checkedImgsChanged', itemSelectedImages);
            }
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