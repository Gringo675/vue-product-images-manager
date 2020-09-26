<template>
    <div class="v-login">
        <form class="login" @submit.prevent="login">
            <h1>Sign in</h1>
            <label>Name</label>
            <input required v-model="name" type="text" placeholder="Name"/>
            <label>Password</label>
            <input required v-model="password" type="password" placeholder="Password"/>
            <button type="submit">Login</button>
        </form>
        <div class="message-area">{{LOGIN_MESSAGE}}</div>
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
                    .then(()=>{
                        this.message = 'Вы успешно зарегистрированы!';
                    })
                    .catch((error) => {
                        this.message = error.response.data;
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

<style scoped>

</style>