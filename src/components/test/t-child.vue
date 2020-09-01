<template>
    <div class="t-child">

        <h3>{{item.name}}</h3>
        <div class="item-image"
             v-for="image in item.images"
             :key="image.id"
        >
               {{image.name}}
            <input type="checkbox"
                   :id='image.id'
                   :value='image.id'
                   v-model="item.checked">

        </div>
    </div>
</template>

<script>
    export default {
        name: "t-child",
        props: {
            item: {
                type: Object,
                default() {
                    return {}
                }
            }
        },
        data() {
            return {
                // itemCheckedImgs: [],
            }
        },
        watch: {
            // itemCheckedImgs(imagesID) {
            //
            //     console.log(imagesID)

                // let itemSelectedImages = {
                //     ean: this.product_data.ean,
                //     images: imagesID
                // };
                // this.$emit('checkedImgsChanged', itemSelectedImages);
            // }
        },
    }
</script>

<style scoped>

</style>