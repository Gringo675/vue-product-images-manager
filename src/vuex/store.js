import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex);

let store = new Vuex.Store({
    state: {
        HOST: 'https://test.chelinstrument.ru',
        token: localStorage.getItem('token') || null,
        loginMessage: 'Введите учетные данные.',
        products: [],
        productsBrands: [],
        cats: [],
        imagebox: [],
        showLoader: false,
        serverImages: [],
        imageViewer: {'images': {}, 'index': null}
    },
    mutations: {
        SET_PRODUCTS_TO_STATE: (state, products) => {
            state.productsBrands.length = 0; // формируем для фильтра
            products.forEach(function (product, i) {
                product.index = i;
                product.itemCheckedImgs = [];
                product.checked = false;
                product.changed = false;
                product.show = true;
                (!state.productsBrands.some((value) => value === product.brand) ?
                    state.productsBrands.push(product.brand) : 0);
            });
            state.products = products;
        },
        SET_CATS_TO_STATE: (state, cats) => {
            state.cats = cats;
        },
        SET_SELECTED_IMAGES_TO_STATE: (state, product) => {
            state.products[product.index].itemCheckedImgs = product.checkedImages;
        },
        RESET_SELECTED_IMAGES_IN_STATE: (state) => {
            state.products.forEach(function (item) {
                item.itemCheckedImgs = [];
            });
        },
        DELETE_SELECTED_IMAGES_IN_STATE: (state) => {
            state.products.forEach(function (item, i, products) {
                if (products[i].itemCheckedImgs.length) {
                    for (let imgFile of item.itemCheckedImgs) {
                        // console.log(imgID);
                        let imgIndex = item.images.findIndex(value => value.file === imgFile);
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
            state.products.forEach(function (item) {
                if (item.itemCheckedImgs.length) {
                    for (let fileName of item.itemCheckedImgs) {
                        let isImageExist = fileNames.some(value => value === fileName);
                        if (!isImageExist) { // нет в массиве
                            fileNames.push(fileName);
                        }
                    }
                }
            });
            // console.log(fileNames);
            if (fileNames.length) {
                state.products.forEach((item) => {
                    for (let imgName of fileNames) {
                        let isItemHasThisImage = item.images.some(value => value.file === imgName);
                        if (isItemHasThisImage) {
                            let isImageAlreadyChecked = item.itemCheckedImgs.some(value => value === imgName);
                            if (!isImageAlreadyChecked) {
                                item.itemCheckedImgs.push(imgName);
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
        MOVE_IMAGE_IN_IMAGEBOX_IN_STATE: (state, data) => {
            // Для смещения вниз move = 1, вверх move = -1
            let move = (data.direction === 'up' ? -1 : 1);
            let element = state.imagebox.splice(data.index, 1);
            state.imagebox.splice(data.index + move, 0, element[0]);
        },
        SET_IMAGES_TO_IMAGEBOX_IN_STATE: (state) => {
            state.products.forEach(function (item) {
                if (item.itemCheckedImgs.length) {
                    item.itemCheckedImgs.forEach(function (checkedImg) {
                        // console.log('checkedImg ', checkedImg);
                        let image = item.images.filter((img) => img.file === checkedImg)[0];
                        let isImageExist = state.imagebox.some((img) => img.file === image.file);
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
        ADD_IMAGEBOX_TO_CHECKED_PRODUCTS_IN_STATE: (state) => {
            let checkedProducts = state.products.filter(value => value.checked === true);
            // console.log(checkedProducts);
            checkedProducts.forEach((product) => {
                state.imagebox.forEach((image) => {
                    let isImageExist = product.images.some(value => value.file === image.file);
                    if (!isImageExist) {
                        product.images.push(image);
                        product.changed = true;
                    }
                });
            });
        },
        SET_TOKEN_TO_STATE: (state, api) => {
            localStorage.setItem('token', api);
            state.token = api;
        },
        DESTROY_TOKEN_IN_STATE: (state, errMsg) => {
            localStorage.removeItem('token');
            state.token = null;
            state.loginMessage = errMsg;
        },
        TOGGLE_LOADER: (state) => {
            state.showLoader = !state.showLoader;
        },
        FILTER_PRODUCTS_IN_STATE: (state, brands) => {
            // console.log(brands)
            state.products.forEach((product) => {
                product.show = brands.some(value => value === product.brand);
            });
        },
        SET_SERVER_IMAGES_TO_STATE: (state, images) => {
            state.serverImages = images;
        },
        CLEAR_SERVER_IMAGES_IN_STATE: (state) => {
            state.serverImages = [];
        },
        SET_FROM_SERVER_IMAGES_TO_IMAGEBOX_IN_STATE: (state, images) => {
            images.forEach((image) => {
                console.log(image);
                (!state.imagebox.some(value => value.file === image) ?
                state.imagebox.push({'file': image, 'id':'', 'name':''}) : 0 );

            });
        },
        CLEAR_IMAGEBOX_IN_STATE: (state) => {
            state.imagebox.splice(0,state.imagebox.length);
        },
        SET_IMAGEVIEWER_IN_STATE: (state, data) => {
            state.imageViewer = data
        },
        CHANGE_IMAGEVIEWER_INDEX_IN_STATE: (state, index) => {
            state.imageViewer.index = index
        },
        CLEAR_IMAGEVIEWER_IN_STATE: (state) => {
            state.imageViewer.images.splice(0,state.imageViewer.images.length);
        },
        UNCHECK_IMAGE_IN_STATE: (state, filename) => {
            // console.log(filename)
            state.products.forEach((product) => {
                product.itemCheckedImgs.forEach((itemFilename, index) => {
                    if (itemFilename === filename) {
                        product.itemCheckedImgs.splice(index, 1);
                    }
                })
            })
        }
    },
    actions: {
        HTTP({state, commit}, data) {
            return new Promise((resolve, reject) => {
                commit('TOGGLE_LOADER');
                if (state.token) {
                    axios.defaults.headers.common['api'] = state.token;
                }
                axios({
                    method: data.method,
                    url: data.url,
                    data: data.data,
                    headers: data.headers
                })
                    .then((response) => {
                        commit('TOGGLE_LOADER');
                        // console.log('response: ', response);
                        resolve(response);
                    })
                    .catch((error) => {
                        commit('TOGGLE_LOADER');
                        // console.log('error.response: ', error.response);
                        if (error.response.status === 401) {
                            commit('DESTROY_TOKEN_IN_STATE', (error.response.data));
                        } else {
                            console.log('error: ', error.response.data);
                            alert('Ошибка при обращении к серверу! Подробности в консоли.');
                        }
                        reject(error)
                    })
            })
        },
        LOGIN_USER({state, dispatch, commit}, data) {
            return new Promise((resolve, reject) => {
                dispatch('HTTP', {
                    method: "post",
                    url: state.HOST + '/img-api/api-login.php',
                    data: data
                })
                    .then((response) => {
                        // console.log(response.data);
                        commit('SET_TOKEN_TO_STATE', response.data);
                        resolve(response);
                    })
                    .catch((error) => {
                        reject(error)
                    });
            })
        },
        GET_CATS_FROM_API({state, commit, dispatch}) {
            dispatch('HTTP', {
                method: "get",
                url: state.HOST + '/img-api/api-get-cats.php',
            })
                .then((response) => {
                    // console.log(response.data);
                    commit('SET_CATS_TO_STATE', response.data);
                });
        },
        GET_PRODUCTS_FROM_API({state, commit, dispatch}, cat_id) {
            dispatch('HTTP', {
                method: "post",
                url: state.HOST + '/img-api/api-get-products.php',
                data: {
                    'cat_id': cat_id
                }
            })
                .then((response) => {
                    // console.log(response.data);
                    commit('SET_PRODUCTS_TO_STATE', response.data);
                });
        },
        GET_ALL_IMAGES_FROM_API({state, commit, dispatch}) {
            dispatch('HTTP', {
                method: "get",
                url: state.HOST + '/img-api/api-get-all-images.php',
            })
                .then((response) => {
                    // console.log(response.data);
                    commit('SET_SERVER_IMAGES_TO_STATE', response.data);
                });
        },
        SUBMIT_IMAGES_TO_SERVER({state, dispatch}, files) {
            return new Promise((resolve) => {
                // axios странно работает. Получается отправить либо $_POST(и то с чтением из потока php://input,
                // либо $_FILES. Пока мне этого достаточно, но...
                dispatch('HTTP', {
                    method: "post",
                    url: state.HOST + '/img-api/api-set-images.php',
                    data: files,
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                    .then((response) => {
                        resolve(response);
                    })
            })
        },
        SAVE_CHANGED_PRODUCTS_ON_SERVER({state, dispatch}) {
            let changedProducts = state.products.filter(value => value.changed === true);
            dispatch('HTTP', {
                method: "post",
                url: state.HOST + '/img-api/api-save-changed-products.php',
                data: changedProducts
            })
                .then((response) => {
                    console.log(response.data);
                    // commit('SET_PRODUCTS_TO_STATE', response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        SET_SELECTED_IMAGES_TO_PRODUCTS({commit}, product) {
            commit('SET_SELECTED_IMAGES_TO_STATE', product)
        },
        RESET_SELECTED_IMAGES({commit}) {
            commit('RESET_SELECTED_IMAGES_IN_STATE');
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
        MOVE_IMAGE_IN_IMAGEBOX({commit}, data) {
            commit('MOVE_IMAGE_IN_IMAGEBOX_IN_STATE', data);
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
        ADD_IMAGEBOX_TO_CHECKED_PRODUCTS({commit}) {
            commit('ADD_IMAGEBOX_TO_CHECKED_PRODUCTS_IN_STATE')
        },
        FILTER_PRODUCTS({commit}, brands) {
            commit('FILTER_PRODUCTS_IN_STATE', brands)
        },
        CLEAR_SERVER_IMAGES({commit}) {
            commit('CLEAR_SERVER_IMAGES_IN_STATE')
        },
        SET_FROM_SERVER_IMAGES_TO_IMAGEBOX({commit}, images) {
            commit('SET_FROM_SERVER_IMAGES_TO_IMAGEBOX_IN_STATE', images)
        },
        CLEAR_IMAGEBOX({commit}) {
            commit('CLEAR_IMAGEBOX_IN_STATE')
        },
        SET_IMAGEVIEWER({commit}, data) {
            commit('SET_IMAGEVIEWER_IN_STATE', data)
        },
        CHANGE_IMAGEVIEWER_INDEX({commit}, index) {
            commit('CHANGE_IMAGEVIEWER_INDEX_IN_STATE', index)
        },
        CLEAR_IMAGEVIEWER({commit}) {
            commit('CLEAR_IMAGEVIEWER_IN_STATE')
        },
        UNCHECK_IMAGE({commit}, filename) {
            commit('UNCHECK_IMAGE_IN_STATE', filename)
        }
    },
    getters: {
        HOST(state) {
            return state.HOST
        },
        LOGGED(state) {
            return state.token !== null;
        },
        LOGIN_MESSAGE(state) {
            return state.loginMessage;
        },
        PRODUCTS(state) {
            return state.products;
        },
        CATS(state) {
            return state.cats;
        },
        IMAGEBOX(state) {
            return state.imagebox;
        },
        HAS_CHANGED_PRODUCTS(state) {
            return state.products.some(value => value.changed === true);
        },
        // HAS_CHECKED_IMAGES(state) {
        //     return state.products.some(value => value.itemCheckedImgs.length);
        // },
        HAS_CHECKED_IMAGES(state, getters) {
            return getters.CHECKED_IMAGES.length > 0;
        },
        CHECKED_IMAGES(state) {
            let result = [];
            state.products.forEach(function (item) {
                if (item.itemCheckedImgs.length) {
                    item.itemCheckedImgs.forEach(function (checkedImg) {
                        // console.log('checkedImg ', checkedImg);
                        let image = item.images.filter((img) => img.file === checkedImg)[0];
                        let isImageExist = result.some((img) => img.file === image.file);
                        (!isImageExist ? result.push(image) : 0);
                        // console.log('image ', image);
                    });
                }
            });
            return result;
        },
        HAS_IMAGES_IN_IMAGEBOX(state) {
            return state.imagebox.length > 0;
        },
        SHOW_LOADER(state) {
            return state.showLoader;
        },
        PRODUCTS_BRANDS(state) {
            return state.productsBrands;
        },
        SERVER_IMAGES(state) {
            return state.serverImages;
        },
        IMAGEVIEWER(state) {
            return state.imageViewer
        },
        SHOW_IMAGEVIEWER(state) {
            return state.imageViewer.images.length > 0;
        }
    }
});

export default store;