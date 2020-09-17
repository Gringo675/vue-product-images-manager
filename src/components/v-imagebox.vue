<template>
    <div class="v-imagebox">
        <div class="imagebox-title">
            <p>Выбранные изображения</p>
        </div>
        <div class="imagebox-items">
            <div class="imagebox-item"
                 v-for="(image, index) in IMAGEBOX"
                 :key="image.file"
            >
                <img
                        :src='"https://test.chelinstrument.ru/components/com_jshopping/files/img_products/" + image.file'
                        :alt='image.name'
                >
                <button @click="DELETE_IMAGE_IN_IMAGEBOX(index)">del</button>
            </div>
        </div>
        <div class="imagebox-footer">
            <input type="file" name="inputFiles" ref="inputFiles" multiple
                   @change="handleFileUpload()">
            <button @click="submitFile">Submit</button>
            <button @click="GET_ALL_IMAGES_FROM_API">С сервера</button>
            <button @click="ADD_IMAGEBOX_TO_CHECKED_PRODUCTS">Добавить</button>
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
            }
        },
        components: {},
        computed: {
            ...mapGetters([
                'IMAGEBOX'
            ]),
        },
        watch: {},
        methods: {
            ...mapActions([
                'HTTP',
                'SET_UPLOAD_IMAGE_TO_IMAGEBOX',
                'DELETE_IMAGE_IN_IMAGEBOX',
                'ADD_IMAGEBOX_TO_CHECKED_PRODUCTS',
                'GET_ALL_IMAGES_FROM_API'
            ]),
            handleFileUpload() {
                 this.inputFiles = this.$refs.inputFiles.files;
                 // console.log(this.inputFiles);
            },
            submitFile() {
                if (this.inputFiles.length) {
                    let formData = new FormData();
                    let isFormDataHasFiles = false;
                    this.inputFiles.forEach(function(item, i) {
                        if (item instanceof File) {
                            formData.append(i, item);
                            isFormDataHasFiles = true;
                        }
                    });
                    if (isFormDataHasFiles) {
// axios странно работает. Получается отправить либо $_POST(и то с чтением из потока php://input,
// либо $_FILES. Пока мне этого достаточно, но...
                        this.HTTP({
                            method: "post",
                            url: 'https://test.chelinstrument.ru/img-api/api-set-images.php',
                            data: formData,
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        }).then((response) => {
                            console.log('SUCCESS!!  response: ', response);

                            formData.forEach((image) => {
                                console.log('this: ', this);
                                console.log('formData: ', image.name);
                                this.SET_UPLOAD_IMAGE_TO_IMAGEBOX(image.name);

                            });
                        })
                            .catch((error) => {
                                console.log('FAILURE!!  error:', error); // error.response.data[0] - т.к. может быть только одна
                            });
                    }
                }
            },
        },
    }
</script>

<style>
    .v-imagebox {
        position: fixed;
        bottom: 40px;
        left: 40px;
        width: 200px;
    }

    .v-imagebox button {
        margin:10px;
    }

    .imagebox-item img {
        width: 50px;
    }
</style>