<template>
    <div class="v-login">
        <div class="form-wrapper" ref="login">
            <div class="header">ПОДКЛЮЧЕНИЕ К СЕРВЕРУ</div>
            <div class="login-form">
                <form class="login" @submit.prevent="login">
                    <input required v-model="name" type="text" placeholder="Name"/>
                    <input required v-model="password" type="password" placeholder="Password"/>
                    <button type="submit">SEND</button>
                </form>
            </div>
            <div class="message-area">{{LOGIN_MESSAGE}}</div>

        </div>

    </div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'

    export default {
        name: "v-login",
        data() {
            return {
                name: '',
                password: '',
            }
        },
        methods: {
            ...mapActions([
                'LOGIN_USER',

            ]),
            login() {
                this.LOGIN_USER({
                    name: this.name,
                    password: this.password
                })
                    .then(() => {

                    })
                    .catch(() => {
                        this.$refs['login'].classList.add('error');
                        setTimeout(()=>{
                            this.$refs['login'].classList.remove('error');
                        }, 440)
                    });
            }
        },
        computed: {
            ...mapGetters([
                'LOGIN_MESSAGE'
            ]),
        },
    }
</script>

<style lang="scss">
    .v-login {
        width: 100%;

        .form-wrapper {
            width: 400px;
            margin: 100px auto;
            padding: 10px;
            background: #f7bd94;
            border: 2px solid #ced2f3;
            border-radius: 5px;

            .header {
                font-size: 18px;
                text-align: center;
            }

            .login-form {
                margin: 20px 0 10px;

                input {
                    font-size: 16px;
                    line-height: 1.5em;
                    cursor: text;
                    width: 150px;
                    padding-left: 10px;
                    margin-right: 10px;
                    border: 1px solid #c2c8fb;
                    border-radius: 5px;

                }

                button {
                    font-size: 14px;
                    line-height: 1.5em;
                    background: #aefbfb;
                    border: 2px solid #8ac3ce;
                    border-radius: 5px;

                    &:hover {
                        background: #e0dbdb;
                        box-shadow: 0 0 4px #948484;
                    }
                }
            }

            &.error {
                background: #ed7a7a;
                animation: tremble .4s;
            }

            @keyframes tremble {
                0% {
                    transform: translateX(0);
                }
                17% {
                    transform: translateX(50px);
                }
                50% {
                    transform: translateX(-50px);
                }
                83% {
                    transform: translateX(50px);
                }
                100% {
                    transform: translateX(0);
                }
            }
        }

    }
</style>