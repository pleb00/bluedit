<script>
import { RouterLink } from 'vue-router'
import { useLoginStore } from '../stores/user.js';
import { mapState, mapActions } from 'pinia';
import GoogleLogin from '../components/GoogleLogin.vue';

export default {
    name: "LoginView",
    data() {
        return {
            emailLogin: "",
            emailRegister: "",
            passwordLogin: "",
            passwordRegister: "",
        };
    },

    components: {
        GoogleLogin
    },

    methods: {
        ...mapActions(useLoginStore, ["login", "register", "googleLoginHandler"]),
        loginSubmit() {
            this.login(this.emailLogin, this.passwordLogin);
        },
        registerSubmit() {
            this.register(this.emailRegister, this.passwordRegister);
        },
        passCredential(response) {
            this.googleLoginHandler(response)
        }
    },
}
</script>

<template>
    <div class="flex justify-center">
        <div class="card bg-base-100 shadow-xl w-96 bg-slate-50 rounded-lg">
            <h1 class="text-center font-semibold text-2xl mt-5">Login to your account</h1>
            <form action="" id="login-form" class="mt-5" @submit.prevent="loginSubmit">
                <figure>
                    <div class="form-control">

                        <label class="label">
                            <span class="label-text">Email</span>
                        </label>
                        <input v-model="emailLogin" type="text" placeholder="Your email"
                            class="input input-bordered max-w-xs w-96" />

                        <label class="label">
                            <span class="label-text">Password</span>
                        </label>
                        <input v-model="passwordLogin" type="password" placeholder="Your password"
                            class="input input-bordered" />

                    </div>
                </figure>
                <div class="card-body items-center text-center">
                    <div class="card-actions">
                        <button class="btn btn-primary">Login</button>
                    </div>
                </div>
            </form>
            <div class="flex justify-center">
                <p class="font-semibold">or Sign in with</p>
            </div>
            <div class="flex justify-center mt-4">
                <GoogleLogin @passCredential="passCredential" />
            </div>
            <div class="flex justify-center">
                <button id="buttonDiv" class="mb-5 mt-2"></button>
            </div>
        </div>

        <div class="flex justify-center m-4">
            <h1 class="card-title">OR</h1>
        </div>

        <div class="card bg-base-100 shadow-xl w-96 bg-slate-50">
            <h1 class="text-center font-semibold text-2xl mt-5">Register</h1>
            <form action="" id="register-form" class="" @submit.prevent="registerSubmit">
                <figure>
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">Email</span>
                        </label>
                        <input v-model="emailRegister" type="text" placeholder="example@example.com"
                            class="input input-bordered" />

                        <label class="label">
                            <span class="label-text">Password</span>
                        </label>
                        <input v-model="passwordRegister" type="password" placeholder="Your password"
                            class="input input-bordered" />
                    </div>
                </figure>
                <div class="card-body items-center text-center">
                    <div class="card-actions">
                        <button class="btn btn-primary">Register</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>
  
<style></style>