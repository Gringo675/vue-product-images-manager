<template>
    <div class="v-catalog-item">
        <div class="product-name">{{product_data.name}}</div>
        <div class="product-image"
             v-for="(image, index) in product_data.images"
             :key="image.id"
        >
            <img
                    :src='"https://test.chelinstrument.ru/components/com_jshopping/files/img_products/" + image.file'
                    :alt='image.name'
            >
            <button
                    @click="deleteImage(index)"
            >
                del
            </button>
        </div>

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
                changed: 0,
        }
        },
        methods: {
            sendDataToParent() {
                this.$emit('sendProductName', this.product_data.name)
            },
            deleteImage(index) {
                console.log(index);
                console.log(this.product_data.images);
                this.product_data.images.splice(index, 1);
                this.changed++;
            }
        },
        watch: {
            changed() {
                console.log('product_data changed!');
    }
    },
    }
</script>

<style>
    .v-catalog-item div {
        float: left;
    }

    .product-image img {
        width: 70px;
    }
</style>