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
            </div>
            <div class="header-block-2">
                <div class="buttons-block">
                    <h4>Выбранные изображения</h4>
                    <!--                    <button-->
                    <!--                            @click="RESET_SELECTED_PRODUCTS_AND_IMAGES">-->
                    <!--                        Сбросить-->
                    <!--                    </button>-->
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
            return {}
        },
        computed: {
            ...mapGetters([
                'HAS_CHANGED_PRODUCTS',
                'HAS_CHECKED_IMAGES',

            ]),
        },
        methods: {
            ...mapActions([
                'RESET_SELECTED_PRODUCTS_AND_IMAGES',
                'DELETE_SELECTED_IMAGES',
                'SELECT_SAME_IMAGES',
                'SET_IMAGES_TO_IMAGEBOX',
                'SAVE_CHANGED_PRODUCTS_ON_SERVER',

            ]),
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
        width: 1280px;
        min-height: 100vh;
        margin: 0 auto;
        background: #edfff8;

        .header {
            position: sticky;
            top: 0;
            display: flex;
            flex-direction: row;
            justify-content: left;
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

                .block-1-wrapper {
                    display: flex;
                    flex-direction: row;
                    margin-top: 10px;

                    button.save {
                        margin: 0 20px;
                    }
                }

            }

            .header-block-2 {


            }

            .header-block-3 {

                .v-imagebox {

                }
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
                        @include arrow(2px, 6px, #a2cece, up);
                    }

                    i.arrow.down {
                        @include arrow(2px, 6px, #a2cece, down);
                    }
                }

            }
        }

        .body {

        }
    }
</style>