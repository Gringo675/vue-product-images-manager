import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex);

let store = new Vuex.Store({
    state: {
        products: [],
        cats: [],
        imagebox: [],
    },
    mutations: {
        SET_PRODUCTS_TO_STATE: (state, products) => {
            products.forEach(function (product, i, products) {
                products[i].index = i;
                products[i].itemCheckedImgs = [];
                products[i].checked = false;
                products[i].changed = false;
            });
            state.products = products;
        },
        SET_CATS_TO_STATE: (state, cats) => {
            state.cats = cats;
        },
        SET_SELECTED_IMAGES_TO_STATE: (state, product) => {
            state.products[product.index].itemCheckedImgs = product.checkedID;
        },
        RESET_SELECTED_PRODUCTS_AND_IMAGES_IN_STATE: (state) => {
            state.products.forEach(function (item, i, products) {
                products[i].checked = false;
                products[i].itemCheckedImgs = [];
            });
        },
        DELETE_SELECTED_IMAGES_IN_STATE: (state) => {
            state.products.forEach(function (item, i, products) {
                if (products[i].itemCheckedImgs.length) {
                    for (let imgID of item.itemCheckedImgs) {
                        // console.log(imgID);
                        let imgIndex = item.images.findIndex(value => value.id === imgID);
                        // console.log(imgIndex);
                        products[i].images.splice(imgIndex, 1);
                    }
                    products[i].itemCheckedImgs = [];
                    products[i].changed = true;
                }
            });
        },
        SELECT_SAME_IMAGES_IN_STATE: (state) => {
            let fileNames = []; // массив со всеми именами файлов выделенных imgs
            state.products.forEach(function (item, i, products) {
                if (item.itemCheckedImgs.length) {
                    for (let imgID of item.itemCheckedImgs) {
                        // console.log(imgID);
                        let imgIndex = item.images.findIndex(value => value.id === imgID);
                        // console.log(imgIndex);
                        let fileName = products[i].images[imgIndex].file;
                        let nameIndex = fileNames.findIndex(value => value === fileName);
                        if (nameIndex === -1) { // нет в массиве
                            fileNames.push(fileName);
                        }
                    }
                }
            });
            // console.log(fileNames);
            if (fileNames.length) {
                state.products.forEach(function (item, i, products) {
                    for (let imgName of fileNames) {
                        let imgIndex = item.images.findIndex(value => value.file === imgName);
                        if (imgIndex >= 0) {
                            let imgID = item.images[imgIndex].id;
                            let checkedIndex = item.itemCheckedImgs.findIndex(value => value === imgID);
                            if (checkedIndex === -1) {
                                products[i].itemCheckedImgs.push(imgID);
                            }
                        }
                    }

                });
            }
        },
        MOVE_IMAGE_IN_PRODUCT_IN_STATE: (state, product) => {
            // Для смещения вправо move = 1, влево move = -1
            let move = 1;
            (product.direction === 'left' ? move = -1 : '');
            let element = state.products[product.index].images.splice(product.imageIndex, 1);
            state.products[product.index].images.splice(product.imageIndex + move, 0, element[0]);
            state.products[product.index].changed = true;
        },
        SET_IMAGES_TO_IMAGEBOX_IN_STATE: (state) => {
            state.products.forEach(function (item) {
                if (item.itemCheckedImgs.length) {
                    item.itemCheckedImgs.forEach(function (checkedImg) {
                        // console.log('checkedImg ', checkedImg);
                        let image = item.images.filter(function (img) {
                            // console.log('img.id ', img.id);
                            return img.id === checkedImg;
                        })[0];
                        let isImageExist = state.imagebox.some(function (img) {
                            return img.file === image.file;
                        });
                        (!isImageExist ? state.imagebox.push(image) : 0);
                        // console.log('image ', image);
                    });

                }

            });
            // console.log('state.imagebox ', state.imagebox);
        },
        SET_UPLOAD_IMAGE_TO_IMAGEBOX_IN_STATE: (state, imagename) => {
            let newImage = {
                file: imagename,
                id: '',
                name: ''
            };
            state.imagebox.push(newImage);
        },
        DELETE_IMAGE_IN_IMAGEBOX_IN_STATE: (state, index) => {
            state.imagebox.splice(index, 1);
        },
        SET_PRODUCT_CHECKED_VALUE_TO_STATE: (state, product) => {
            state.products[product.index].checked = product.checked;
        },

    },
    actions: {
        GET_PRODUCTS_FROM_API({commit}, cat_id) {
            return axios({
                method: "post",
                url: 'https://test.chelinstrument.ru/img-api/api-get-products.php',
                data: {
                    'cat_id': cat_id
                }
            })
                .then((response) => {
                    // console.log(response.data);
                    commit('SET_PRODUCTS_TO_STATE', response.data);
                    return response;
                })
                .catch((error) => {
                    console.log(error);
                    return error;
                })
        },
        GET_CATS_FROM_API({commit}) {
            return axios('https://test.chelinstrument.ru/img-api/api-get-cats.php', {
                method: "GET"
            })
                .then((response) => {
                    commit('SET_CATS_TO_STATE', response.data);
                    return response;
                })
                .catch((error) => {
                    console.log(error);
                    return error;
                })
        },
        SET_SELECTED_IMAGES_TO_PRODUCTS({commit}, product) {
            commit('SET_SELECTED_IMAGES_TO_STATE', product)
        },
        RESET_SELECTED_PRODUCTS_AND_IMAGES({commit}) {
            commit('RESET_SELECTED_PRODUCTS_AND_IMAGES_IN_STATE');
        },
        DELETE_SELECTED_IMAGES({commit}) {
            commit('DELETE_SELECTED_IMAGES_IN_STATE');
        },
        SELECT_SAME_IMAGES({commit}) {
            commit('SELECT_SAME_IMAGES_IN_STATE');
        },
        MOVE_IMAGE_IN_PRODUCT({commit}, product) {
            commit('MOVE_IMAGE_IN_PRODUCT_IN_STATE', product);
        },
        SET_IMAGES_TO_IMAGEBOX({commit}) {
            commit('SET_IMAGES_TO_IMAGEBOX_IN_STATE');
        },
        SET_UPLOAD_IMAGE_TO_IMAGEBOX({commit}, imagename) {
            commit('SET_UPLOAD_IMAGE_TO_IMAGEBOX_IN_STATE', imagename);
        },
        DELETE_IMAGE_IN_IMAGEBOX({commit}, index) {
            commit('DELETE_IMAGE_IN_IMAGEBOX_IN_STATE', index);
        },
        SET_PRODUCT_CHECKED_VALUE({commit}, product) {
            commit('SET_PRODUCT_CHECKED_VALUE_TO_STATE', product)
        },
    },
    getters: {
        PRODUCTS(state) {
            return state.products;
        },
        CATS(state) {
            return state.cats;
        },
        IMAGEBOX(state) {
            return state.imagebox;
        },
    }
});

export default store;