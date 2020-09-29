<template>
    <div class="v-main-wrapper">
        <div class="header">
            <div class="header-block-1">
                <div class="block-1-wrapper">
                    <vCats/>
                    <div class="buttons-block">
                        <button class="save"
                                :class="{ unactive: !HAS_CHANGED_PRODUCTS}"
                                @click="SAVE_CHANGED_PRODUCTS_ON_SERVER">
                            Сохранить
                        </button>
                    </div>
                </div>
                <div class="holder"
                     v-if="HAS_CHECKED_PRODUCTS">
                    <div class="toggle"
                         @click="toggleHolder1">
                        <div class="btn-del"
                             @click.stop="resetSelectedProducts"
                        ></div>
                        <span class="total">Всего: {{CHECKED_PRODUCTS.length}}</span>
                        <i class="arrow"
                           :class="showHolder1Items ? 'up' : 'down'"></i>
                    </div>

                    <div class="product-items"
                         v-show="showHolder1Items">
                        <div class="product-item"
                             v-for="(product) in CHECKED_PRODUCTS"
                             :key="product.ean"
                        >
                            <div class="product-name"> {{product.name}}</div>
                            <div class="btn-del" @click="UNCHECK_PRODUCT(product.index)"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="header-block-2">
                <div class="buttons-block">
                    <h4>Выбранные изображения</h4>
                    <button
                            :class="{ unactive: !HAS_CHECKED_IMAGES}"
                            @click="DELETE_SELECTED_IMAGES">
                        Удалить
                    </button>
                    <button
                            :class="{ unactive: !HAS_CHECKED_IMAGES}"
                            @click="SELECT_SAME_IMAGES">
                        Аналоги
                    </button>
                    <button
                            :class="{ unactive: !HAS_CHECKED_IMAGES}"
                            @click="SET_IMAGES_TO_IMAGEBOX">
                        В буфер
                    </button>
                </div>
                <div class="holder"
                     v-if="HAS_CHECKED_IMAGES">
                    <div class="toggle"
                         @click="toggleHolder2">
                        <div class="btn-del"
                             @click.stop="resetSelectedImages"
                        ></div>
                        <span class="total">Всего: {{CHECKED_IMAGES.length}}</span>
                        <i class="arrow"
                           :class="showHolder2Items ? 'up' : 'down'"></i>
                    </div>

                    <div class="image-items"
                         v-show="showHolder2Items">
                        <div class="image-item"
                             v-for="(image, index) in CHECKED_IMAGES"
                             :key="image.file"
                        >
                            <img
                                    @click="createImageViewer(index)"
                                    :src='HOST + "/components/com_jshopping/files/img_products/thumb_" + image.file'
                                    :alt='image.name'
                            >
                            <div class="buttons">
                                <div class="btn-del" @click="UNCHECK_IMAGE(image.file)"></div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <div class="header-block-3">
                <vImagebox/>
                <div class="imagebox">


                </div>

            </div>
        </div>

        <div class="body">
            <vCatalog/>
        </div>


        <vServerImages/>
    </div>
</template>

<script>
    import vCatalog from './v-catalog'
    import vCats from './v-cats'
    import vImagebox from './v-imagebox'
    import vServerImages from './v-server-images'
    import {mapActions, mapGetters} from 'vuex'

    export default {
        name: 'v-main-wrapper',
        components: {
            vCatalog,
            vCats,
            vImagebox,
            vServerImages,

        },
        props: {},
        data() {
            return {
                showHolder1Items: false,
                showHolder2Items: false,
            }
        },
        computed: {
            ...mapGetters([
                'HAS_CHANGED_PRODUCTS',
                'HAS_CHECKED_IMAGES',
                'CHECKED_IMAGES',
                'HOST',
                'CHECKED_PRODUCTS',
                'HAS_CHECKED_PRODUCTS'
            ]),
        },
        methods: {
            ...mapActions([
                'RESET_SELECTED_PRODUCTS_AND_IMAGES',
                'DELETE_SELECTED_IMAGES',
                'SELECT_SAME_IMAGES',
                'SET_IMAGES_TO_IMAGEBOX',
                'SAVE_CHANGED_PRODUCTS_ON_SERVER',
                'RESET_SELECTED_IMAGES',
                'UNCHECK_IMAGE',
                'SET_IMAGEVIEWER',
                'RESET_SELECTED_PRODUCTS',
                'UNCHECK_PRODUCT'
            ]),
            toggleHolder1() {
                this.showHolder1Items = !this.showHolder1Items;
            },
            toggleHolder2() {
                this.showHolder2Items = !this.showHolder2Items;
            },
            resetSelectedImages() {
                this.showHolder2Items = false;
                this.RESET_SELECTED_IMAGES();
            },
            resetSelectedProducts() {
                this.showHolder1Items = false;
                this.RESET_SELECTED_PRODUCTS();
            },
            createImageViewer(index) {
                let aaa = JSON.parse(JSON.stringify(this.CHECKED_IMAGES)); // работает

                this.SET_IMAGEVIEWER({images: aaa, index})
            }
        },
        watch: {},
        mounted() {
        }
    }
</script>

<style lang="scss">
    .v-main-wrapper {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        width: 1280px;
        min-height: 100vh;
        margin: 0 auto;
        background: #edfff8;

        .header {
            position: sticky;
            top: 0;
            display: flex;
            flex-direction: row;
            justify-content: center;
            width: 100vw;
            background: #f7bd94;
            box-shadow: 0px 6px 6px 4px #f7bd94;

            > div {
                border: 1px solid #ea8b62;
                border-radius: 5px;
                margin: 10px 10px 0;
                padding: 5px;
            }

            button {
                margin: 5px;
                padding: 5px;
                font-size: 16px;
                background: #aefbfb;
                border: 2px solid #8ac3ce;
                border-radius: 5px;

                &.unactive {
                    color: #b7b5b5;
                    background: #f9d2b7;
                    border-color: #bfbebe;

                    &:hover {
                        background: #f9d2b7;
                        box-shadow: none;
                    }
                }

                &:hover {
                    background: #e0dbdb;
                    box-shadow: 0 0 4px #948484;
                }
            }

            h4 {
                text-align: center;
                margin: 0 auto 10px;
            }

            .header-block-1 {
                position: relative;

                .block-1-wrapper {
                    display: flex;
                    flex-direction: row;
                    margin-top: 10px;

                    button.save {
                        margin: 0 20px;
                    }
                }

                .holder {
                    width: 380px;
                    top: 81px;
                    left: 28px;

                    .product-items {
                        margin: 1px;
                        padding: 10px;
                        background: #f3f3f3;
                        overflow: auto;
                        max-height: 400px;
                        border: 1px solid #ccc;
                        border-radius: 0 0 5px 5px;

                        .product-item {
                            display: flex;
                            flex-direction: row;
                            justify-content: space-between;
                            align-items: center;
                            margin-top: 10px;
                            padding: 5px;
                            border: 1px solid #ccc;
                            border-radius: 5px;

                            &:first-child {
                                margin-top: 0;
                            }

                            .btn-del {
                                position: static;
                                flex-shrink: 0;
                                margin-left: 10px;
                            }

                        }
                    }
                }

            }

            .header-block-2 {
                position: relative;

                .holder {
                    width: 200px;
                    top: 81px;
                    left: 31px;
                }

            }

            .header-block-3 {


            }

            .holder {
                position: absolute;
                background: #f7bd94;
                border: 1px solid #ea8b62;
                border-top: none;
                border-radius: 0 0 5px 5px;
                box-shadow: 0px 0px 6px 4px #f7bd94;

                .btn-del {
                    border: 2px solid #c06ada;
                    border-radius: 50%;
                    width: 18px;
                    height: 18px;
                    background: #ef4646;
                    position: absolute;
                    top: 9px;
                    cursor: pointer;

                    &:after {
                        content: '\2716';
                        font-size: 14px;
                        line-height: 18px;
                        display: block;
                        text-align: center;
                        color: white;
                    }

                    &:hover {
                        box-shadow: 0 0 5px 1px #ef4646;
                    }
                }


                .toggle {
                    cursor: pointer;
                    padding: 10px;

                    .total {
                        margin-left: 30px;
                    }

                    i.arrow {
                        float: right;
                        transition: .2s linear;
                    }

                    i.arrow.up {
                        @include arrow(2px, 8px, #687adc, up);
                    }

                    i.arrow.down {
                        @include arrow(2px, 8px, #687adc, down);
                    }
                }

                .image-items {
                    margin: 1px;
                    padding: 10px;
                    background: #f3f3f3;
                    overflow: auto;
                    max-height: 400px;
                    border: 1px solid #ccc;
                    border-radius: 0 0 5px 5px;

                    .image-item {
                        display: flex;
                        flex-direction: row;
                        align-items: center;
                        margin-top: 10px;

                        &:first-child {
                            margin-top: 0;
                        }

                        img {
                            width: 100px;
                            padding: 5px;
                            border: 1px solid #ccc;
                            border-radius: 5px;
                            background: white;
                            cursor: pointer;
                        }

                        .buttons {
                            margin: 10px;

                            .btn-del {
                                position: static;
                                margin: 10px auto;
                            }

                            .btn {
                                border: 1px solid #ccc;
                                border-radius: 5px;
                                padding: 3px 5px;
                                background: #e4e4e4;
                                cursor: pointer;

                                &:hover {
                                    box-shadow: 0 0 6px 1px #ccc;
                                }


                                i.arrow.up {
                                    @include arrow(2px, 6px, #687adc, up);
                                }

                                i.arrow.down {
                                    @include arrow(2px, 6px, #687adc, down);
                                }
                            }
                        }
                    }
                }

            }
        }

        .body {
            margin-top: 50px;
            //width: 100%;
        }
    }
</style>