<template>
    <div class="v-server-images"
         v-if="SERVER_IMAGES.length">
        <div class="v-server-images-header">
            <span class="title">Изображения на сервере</span>
        </div>
        <div class="v-server-images-content">
            <div class="item"
                 v-for="image in SERVER_IMAGES"
                 :key="image"
                 v-show="filterImage(image)"
            >
                <img
                        :src='"https://test.chelinstrument.ru/components/com_jshopping/files/img_products/thumb_" + image'
                >
                <input type="checkbox"
                       :id='image'
                       :value='image'
                       v-model="checkedImages">
            </div>

        </div>
        <div class="v-server-images-footer clearfix">
            <div class="filter">
                <input v-model="filterMask"
                       placeholder="Введите маску для фильтрации">
            </div>
            <div class="buttons">
                <button class="add-to-imagebox"
                        @click="SET_FROM_SERVER_IMAGES_TO_IMAGEBOX(checkedImages)"
                >Добавить
                </button>
                <button class="close"
                        @click="CLEAR_SERVER_IMAGES"
                >Закрыть
                </button>
            </div>

        </div>
    </div>
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
                'SET_FROM_SERVER_IMAGES_TO_IMAGEBOX'

            ]),
            filterImage(image) {
                let regexp = new RegExp(`${this.filterMask}`, 'ig');
                return regexp.test(image)
            }
        },
        computed: {
            ...mapGetters([
                'SERVER_IMAGES',
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
        top: 50px;
        left: 50%;
        z-index: 1050;
        width: 1000px;
        margin-left: -500px;
        border: 1px solid rgba(0, 0, 0, .3);
        border-radius: 6px;
        box-shadow: 0 3px 7px rgba(0, 0, 0, .3);
        background-color: #fff;

        .v-server-images-header {
            border-bottom: 1px solid rgba(0, 0, 0, .3);
            padding: 10px;
        }

        .v-server-images-content {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;
            overflow: auto;
            height: 400px;

            .item {


                input {
                    position: relative;
                    right: 30px;
                    bottom: 10px;
                }
            }
        }

        .v-server-images-footer {
            border-top: 1px solid rgba(0, 0, 0, .3);
            padding: 10px;

            .filter {
                float:left;

                input {
                    width: 250px;
                }
            }

            .buttons {
                float: right;

                button {
                    margin: 0 10px;
                }
            }
        }
    }

    .clearfix:after {
        content: "";
        display: table;
        clear: both;
    }
</style>