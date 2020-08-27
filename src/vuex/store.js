import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex);

let store = new Vuex.Store({
    state: {
        products: [],
        cats: []
    },
    mutations: {
        SET_PRODUCTS_TO_STATE: (state, products) => {
            state.products = products;
        },
        SET_CATS_TO_STATE: (state, cats) => {
            state.cats = cats;
        }
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
                    console.log(response.data);
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
        }
    },
    getters: {
        PRODUCTS(state) {
            return state.products;
        },
        CATS(state) {
            return state.cats;
        }
    }
});

export default store;