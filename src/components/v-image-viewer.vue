<template>
    <div class="v-lightbox">
        <div class="wrapper" ref="lightbox-wrapper">
            <div class="image-block">
                <img
                        :src='HOST + "/components/com_jshopping/files/img_products/full_"
                                + IMAGEVIEWER.images[IMAGEVIEWER.index].file'
                >
            </div>
            <div class="control-block">
                <div class="btn btn-up"
                     @click="rollImages('up')"
                ><i class="arrow up"></i></div>
                <div class="thumb-image"
                     v-for="(image, index) in IMAGEVIEWER.images"
                     :key="image.file"
                     :class="{ active: index === IMAGEVIEWER.index}"
                     @click="CHANGE_IMAGEVIEWER_INDEX(index)"
                >
                    <img
                            :src='HOST + "/components/com_jshopping/files/img_products/thumb_"
                                + image.file'
                    >
                </div>
                <div class="btn btn-down"
                     @click="rollImages('down')"
                >
                    <i class="arrow down"></i> </div>
            </div>
            <div class="btn-close" @click="CLEAR_IMAGEVIEWER"></div>
        </div>
    </div>
</template>

<script>

import {mapActions, mapGetters} from 'vuex'

    export default {
        name: "v-image-viewer",
        components: {},
        props: {

        },
        data() {
            return {}
        },
        computed: {
            ...mapGetters([
                'IMAGEVIEWER',
                'HOST',
            ])
        },
        methods: {
            ...mapActions([
                'CHANGE_IMAGEVIEWER_INDEX',
                'CLEAR_IMAGEVIEWER',

            ]),
            rollImages(direction) {
                if (direction === 'up') {
                    let index = this.IMAGEVIEWER.index - 1;
                    if (index < 0) {
                        index = this.IMAGEVIEWER.images.length - 1
                    }
                    this.CHANGE_IMAGEVIEWER_INDEX(index);
                }
                else if (direction === 'down') {
                    let index = this.IMAGEVIEWER.index + 1;
                    if (index > this.IMAGEVIEWER.images.length - 1) {
                        index = 0
                    }
                    this.CHANGE_IMAGEVIEWER_INDEX(index);
                }
            },

        },
        watch: {},
        mounted() {
            // let vm=this;
            // document.addEventListener('click', function(item) {
            //     if(item.target === vm.$refs['lightbox-wrapper']) {
            //         vm.closeLightbox();
            //     }
            // })
        },
    }
</script>

<style lang="scss">

    .v-lightbox {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 1040;
        background: rgba(0, 0, 0, 0.6);


        .wrapper {
            position: relative;
            width: 1280px;
            margin: 0 auto;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            background: rgba(0, 0, 0, 0.6);
            height: 100%;
            // border: 1px solid #ffffff;

            .image-block {
                overflow: auto;
            //    margin-top: 20px;

                img {
                    max-width: 1000px;
                }
            }

            .control-block {
                position: absolute;
                top: 40px;
                left: 20px;
                padding: 20px;
                opacity: .8;
                border: 1px solid #3e424b;
                border-radius: 20px;

                > div:hover {
                    box-shadow: 0 0 4px 0 #ddd;
                }

                .btn {
                    border: 1px solid #ccc;
                    border-radius: 5px;
                    width: 52px;
                    color: #ccc;
                    padding: 5px;
                    cursor: pointer;

                    i.arrow.down {
                        @include arrow(2px, 6px, #ccc, down);
                    }
                    i.arrow.up {
                       @include arrow(2px, 6px, #ccc, up);
                    }
                }
                & .unactive {
                    color: #5d5d5d;
                    border-color: #5d5d5d;
                    cursor: default;

                    i.arrow.down,  i.arrow.up {
                        border-color: #5d5d5d;
                    }

                }


                .thumb-image {
                    margin: 10px auto;
                    padding: 5px;
                    cursor: pointer;

                    &.active {
                        border: 2px solid #ccc;
                        border-radius: 5px;
                    }

                    img {
                        display: block;
                        margin: auto;
                        width: 50px;
                    }
                }
            }

        }

    }
</style>