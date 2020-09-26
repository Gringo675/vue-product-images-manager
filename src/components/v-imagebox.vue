<template>
    <div class="v-imagebox">
        <h4>Буфер изображений</h4>
        <div class="imagebox-buttons">
            <input type="file" name="inputFiles" ref="inputFiles" multiple
                   @change="handleFileUpload()">
            <button @click="getFilesFromLocalDisk">С диска</button>
            <button @click="GET_ALL_IMAGES_FROM_API">С сервера</button>
            <button
                    :class="{ unactive: !HAS_IMAGES_IN_IMAGEBOX}"
                    @click="ADD_IMAGEBOX_TO_CHECKED_PRODUCTS">Прикрепить к товарам
            </button>
        </div>
        <div class="holder"
             v-if="HAS_IMAGES_IN_IMAGEBOX">
            <div class="toggle"
                 @click="toggleImagebox">
                <div class="btn-del"
                     @click="CLEAR_IMAGEBOX"
                ></div>
                <span class="total">Всего: {{IMAGEBOX.length}}</span>
                <i class="arrow"
                   :class="showImageboxItems ? 'up' : 'down'"></i>
            </div>

            <div class="imagebox-items"
                 v-show="showImageboxItems">
                <div class="imagebox-item"
                     v-for="(image, index) in IMAGEBOX"
                     :key="image.file"
                     @click="createImageViewer(index)"
                >
                    <img
                            :src='"https://test.chelinstrument.ru/components/com_jshopping/files/img_products/thumb_" + image.file'
                            :alt='image.name'
                    >
                    <div class="buttons">
                        <div class="btn"
                             v-show="index > 0"
                             @click="MOVE_IMAGE_IN_IMAGEBOX({index: index, direction: 'up'})"
                        ><i class="arrow up"></i>
                        </div>
                        <div class="btn-del" @click="DELETE_IMAGE_IN_IMAGEBOX(index)"></div>
                        <div class="btn"
                             v-show="index+1 !== IMAGEBOX.length"
                             @click="MOVE_IMAGE_IN_IMAGEBOX({index: index, direction: 'down'})"
                        ><i class="arrow down"></i>
                        </div>
                    </div>

                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'

    export default {
        name: "v-imagebox",
        data() {
            return {
                inputFiles: '',
                showImageboxItems: false,
            }
        },
        components: {},
        computed: {
            ...mapGetters([
                'IMAGEBOX',
                'HAS_IMAGES_IN_IMAGEBOX',

            ]),
        },
        watch: {},
        methods: {
            ...mapActions([
                'SUBMIT_IMAGES_TO_SERVER',
                'SET_UPLOAD_IMAGE_TO_IMAGEBOX',
                'DELETE_IMAGE_IN_IMAGEBOX',
                'ADD_IMAGEBOX_TO_CHECKED_PRODUCTS',
                'GET_ALL_IMAGES_FROM_API',
                'MOVE_IMAGE_IN_IMAGEBOX',
                'CLEAR_IMAGEBOX',
                'SET_IMAGEVIEWER'
            ]),
            handleFileUpload() {
                this.inputFiles = this.$refs.inputFiles.files;
                console.log('this.inputFiles.length', this.inputFiles.length);
                if (this.inputFiles.length) {
                    let formData = new FormData();
                    let isFormDataHasFiles = false;
                    this.inputFiles.forEach(function (item, i) {
                        if (item instanceof File) {
                            formData.append(i, item);
                            isFormDataHasFiles = true;
                        }
                    });
                    if (isFormDataHasFiles) {
                        this.SUBMIT_IMAGES_TO_SERVER(formData)
                            .then(() => {
                                formData.forEach((image) => {
                                    this.SET_UPLOAD_IMAGE_TO_IMAGEBOX(image.name);
                                });
                            })
                    }
                }
            },
            getFilesFromLocalDisk() {
                this.$refs.inputFiles.click();
            },
            toggleImagebox() {
                this.showImageboxItems = !this.showImageboxItems
            },
            createImageViewer(index) {
                // let aaa = this.IMAGEBOX; копирует по ссылке (IMAGEBOX <=> IMAGEVIEWER)
                // let aaa = Object.assign({}, {images: this.IMAGEBOX}, {'index': index}); копирует по ссылке
                // let aaa = { ...this.IMAGEBOX}; клонирует, но не срабатывает ревктивность
                // let aaa = Object.assign({}, this.IMAGEBOX); клонирует, но не срабатывает ревктивность
                let aaa = JSON.parse(JSON.stringify(this.IMAGEBOX)); // работает

                this.SET_IMAGEVIEWER({images: aaa, index})
            }
        },
    }
</script>

<style lang="scss">
    .v-imagebox {
        position: relative;

        input {
            display: none;
        }

        .holder {
            width: 200px;
            top: 76px;
            left: 149px;

            .imagebox-items {
                margin: 1px;
                padding: 10px;
                background: #f3f3f3;
                overflow: auto;
                max-height: 400px;
                border: 1px solid #ccc;
                border-radius: 0 0 5px 5px;

                .imagebox-item {
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

</style>