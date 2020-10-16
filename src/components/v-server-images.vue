<template>
    <transition name="imageviewer">
        <div class="v-server-images"
             v-if="SERVER_IMAGES.length">
            <div class="v-server-images-header">
                <span class="title">Изображения на сервере</span>
            </div>
            <div class="v-server-images-content">
                <div class="item"
                     v-for="image in SERVER_IMAGES"
                     :key="image.file"
                     v-show="filterImage(image.file)"
                >
                    <label :for='image.file'>
                        <img
                                :src='HOST + "/components/com_jshopping/files/img_products/thumb_" + image.file'
                        >
                        <div class="image-name">{{image.file}}</div>
                    </label>

                    <input type="checkbox"
                           :id='image.file'
                           :value='image'
                           v-model="checkedImages">
                    <div class="zoom"
                         @click="createImageViewer(image.file)">+
                    </div>
                </div>

            </div>
            <div class="v-server-images-footer">
                <div class="filter">
                    <input v-model="filterMask"
                           placeholder="Введите маску для фильтрации">
                </div>
                <div class="total">Выбрано изображений: {{checkedImages.length}}</div>
                <div class="buttons">
                    <button class="add-to-imagebox"
                            @click="addToImagebox(checkedImages)"
                    >Добавить
                    </button>
                    <button class="close"
                            @click="close"
                    >Закрыть
                    </button>
                </div>

            </div>
        </div>
    </transition>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'

    export default {
        name: "v-server-images",
        components: {},
        data() {
            return {
                checkedImages: [],
                filterMask: ''
            }
        },
        methods: {
            ...mapActions([
                'CLEAR_SERVER_IMAGES',
                'SET_FROM_SERVER_IMAGES_TO_IMAGEBOX',
                'SET_IMAGEVIEWER'

            ]),
            filterImage(image) {
                let regexp = new RegExp(`${this.filterMask}`, 'ig');
                return regexp.test(image)
            },
            close() {
                this.checkedImages.length = 0;
                this.filterMask = '';
                this.CLEAR_SERVER_IMAGES();
            },
            addToImagebox(checkedImages) {
                this.SET_FROM_SERVER_IMAGES_TO_IMAGEBOX(checkedImages);
                this.close();
            },
            createImageViewer(file) {
                 let image = this.SERVER_IMAGES.filter(item => item.file === file );
                let index = 0;
                this.SET_IMAGEVIEWER({images: image, index})
            }
        },
        computed: {
            ...mapGetters([
                'SERVER_IMAGES',
                'HOST',
            ]),
        },
        watch: {},
        mounted() {
        },
    }
</script>

<style lang="scss">
    .v-server-images {
        position: fixed;
        top: 110px;
        left: 50%;
        z-index: 1050;
        width: 1030px;
        margin-left: -500px;
        border: 2px solid #8adee4;
        border-radius: 5px;
        box-shadow: 0 0 0px 2000px #00000070;
        background-color: #fff;

        .v-server-images-header {
            border-bottom: 2px solid #8adee4;
            padding: 10px;
            font-size: 20px;
            background: #94ead280;
        }

        .v-server-images-content {
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-start;
            align-items: flex-start;
            overflow: auto;
            height: 400px;

            .item {
                margin: 5px;
                position: relative;

                img {
                    width: 100px;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                }

                input {
                    position: absolute;
                    right: 7px;
                    bottom: 10px;
                }

                .image-name {
                    position: absolute;
                    top: -10px;
                    padding: 5px;
                    background: #ffffffb3;
                    font-size: 14px;
                    visibility: hidden;
                    opacity: 0;
                    width: 96%;
                    margin: 0 2%;
                    box-sizing: border-box;
                    text-align: center;
                    word-break: break-all;
                    //border: 1px solid red;
                    transition: all .2s linear .2s;
                }

                &:hover .image-name {
                    visibility: visible;
                    top: 10px;
                    opacity: 1;
                }

                .zoom {
                    position: absolute;
                    padding: 2px;
                    margin: 5px;
                    border: 2px solid #c1e4f3;
                    border-radius: 50%;
                    left: 2px;
                    bottom: 5px;
                    font-size: 35px;
                    line-height: 18px;
                    width: 20px;
                    height: 20px;
                    text-align: center;
                    color: #e0f1f6;
                    cursor: zoom-in;
                    transition: transform .2s linear;

                    &:hover {
                        transform: scale(1.2);
                        box-shadow: 0 0 4px #c0ddf4;
                    }
                }
            }
        }

        .v-server-images-footer {
            border-top: 2px solid #8adee4;
            padding: 10px;
            background: #ffd2d0;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;

            .filter {
                margin-left: 10px;

                input {
                    width: 300px;
                    font-size: 16px;
                    padding-left: 5px;
                    border: 1px solid #f39696;
                    border-radius: 5px;
                    line-height: 1.5em;
                    cursor: text;
                }
            }

            .total {
                margin-left: 30px;
                flex-grow: 1;
            }

            .buttons {


                button {
                    margin: 5px;
                    padding: 5px;
                    font-size: 16px;
                    background: #aefbfb;
                    border: 2px solid #8ac3ce;
                    border-radius: 5px;

                    &:hover {
                        background: #e0dbdb;
                        box-shadow: 0 0 4px #948484;
                    }
                }
            }
        }
    }

</style>