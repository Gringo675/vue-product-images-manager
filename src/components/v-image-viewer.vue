<template>
    <div class="v-image-viewer" ref="viewer">
        <div class="wrapper" ref="viewer-wrapper">
            <div class="image-block">
                <img
                        :src='HOST + "/components/com_jshopping/files/img_products/full_"
                                + IMAGEVIEWER.images[IMAGEVIEWER.index].file'
                >
            </div>
            <div class="file-info">
                <div>
                    <span class="no-select title">name:</span>
                    <span>{{IMAGEVIEWER.images[IMAGEVIEWER.index].file}}</span>
                </div>
                <div class="no-select">
                    <span class="title">width:</span> <span>{{IMAGEVIEWER.images[IMAGEVIEWER.index].width}} px</span>
                </div>
                <div class="no-select">
                    <span class="title">height:</span> <span>{{IMAGEVIEWER.images[IMAGEVIEWER.index].height}} px</span>
                </div>
                <div class="no-select">
                    <span class="title">size:</span> <span>{{IMAGEVIEWER.images[IMAGEVIEWER.index].size}} kB</span>
                </div>
                <div class="no-select">
                    <span class="title">date:</span> <span>{{IMAGEVIEWER.images[IMAGEVIEWER.index].date}}</span>
                </div>
            </div>
            <div class="control-block"
                 v-if="IMAGEVIEWER.images.length > 1">
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
                    <i class="arrow down"></i></div>
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
        props: {},
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
                } else if (direction === 'down') {
                    let index = this.IMAGEVIEWER.index + 1;
                    if (index > this.IMAGEVIEWER.images.length - 1) {
                        index = 0
                    }
                    this.CHANGE_IMAGEVIEWER_INDEX(index);
                }
            },
            onKeyDown(e) {
                e.preventDefault();
                if (e.key === 'Escape') {
                    this.CLEAR_IMAGEVIEWER();
                } else if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
                    this.rollImages('down');
                } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
                    this.rollImages('up');
                }
            },
            onClick(e) {
                if (e.target === this.$refs['viewer'] || e.target === this.$refs['viewer-wrapper']) {
                    this.CLEAR_IMAGEVIEWER();
                }
            },
            onWheel(e) {
                e.preventDefault();
                (e.deltaY > 0 ? this.rollImages('down') : this.rollImages('up'));
            }

        },
        watch: {},
        mounted() {
            document.addEventListener('click', this.onClick);
            document.addEventListener('keydown', this.onKeyDown);
            document.addEventListener('wheel', this.onWheel, { passive: false })
        },
        beforeDestroy() {
            document.removeEventListener('click', this.onClick);
            document.removeEventListener('keydown', this.onKeyDown);
            document.removeEventListener('wheel', this.onWheel)
        }
    }
</script>

<style lang="scss">

    .v-image-viewer {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 1060;
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

            .image-block {
                overflow: auto;
                //    margin-top: 20px;

                img {
                    max-width: 1000px;
                }
            }

            .file-info {
                position: absolute;
                left: 20px;
                bottom: 20px;
                color: #fff;
                padding: 20px;
                opacity: 0.8;
                border: 1px solid #3e424b;
                border-radius: 20px;
                background: #2c2c2c;

                div {
                    line-height: 1.4em;
                }

                .no-select {
                    user-select: none;
                }

                span.title {
                    display: inline-block;
                    width: 55px;
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
                max-height: 670px;
                overflow: hidden;
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                align-items: center;

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

                    &.btn-up {
                        margin-bottom: 7px;
                    }
                    &.btn-down {
                        margin-top: 7px;
                    }

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

                    i.arrow.down, i.arrow.up {
                        border-color: #5d5d5d;
                    }

                }


                .thumb-image {
                    padding: 5px;
                    cursor: pointer;
                    height: 75px;
                    min-height: 0;
                    flex-shrink: 1;

                    &.active {
                        border: 2px solid #ccc;
                        border-radius: 5px;
                    }

                    img {
                        display: block;
                        margin: auto;
                        height: 100%;
                    }
                }
            }

        }

    }
</style>