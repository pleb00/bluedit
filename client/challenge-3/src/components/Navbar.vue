<script>
import { RouterLink, RouterView } from 'vue-router'
import { useLoginStore } from '../stores/user';
import { mapState, mapActions, mapWritableState } from 'pinia';

import Swal from 'sweetalert2'
export default {
    name: "Navbar",
    data() {
        return {
            access_token: "",
            search: "",
            // isLogged: false,
        }
    },
    computed: {
        ...mapWritableState(useLoginStore, ['isLoggedIn']),
    },
    methods: {

        logout() {
            localStorage.clear()
            this.isLoggedIn = false;
            Swal.fire({
                icon: "success",
                title: "Logout success",
                showConfirmButton: false,
                timer: 1500,
            });
            this.$router.push('/')
        },
        loginChecker() {
            const access_token = localStorage.getItem('access_token')
            if (access_token) {
                this.isLoggedIn = true
            } else {
                this.isLoggedIn = false
            }
        },

    },
    created() {
        this.loginChecker();
    },
}
</script>

<template>
    <section>
        <div class="navbar bg-blue-600">
            <div class="flex-1">
                <RouterLink to="/">
                    <a class="btn btn-ghost normal-case text-xl text-white">bluedit</a>
                </RouterLink>
            </div>
            <div class="flex-none gap-2">
                <div class="dropdown dropdown-end">
                    <label tabindex="0" class="btn btn-ghost btn-circle avatar">
                        <div class="w-10 rounded-full">
                            <img src="../assets/img/avatarPlaceholder.png" />
                        </div>
                    </label>

                    <div v-if="isLoggedIn === true">
                        <ul tabindex="0"
                            class="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
                            <li>
                                <RouterLink to="/bookmark">
                                    Bookmarks
                                </RouterLink>
                            </li>
                            <li>
                                <a @click="logout">Logout</a>
                            </li>
                        </ul>
                    </div>
                    <div v-else>
                        <ul tabindex="0"
                            class="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
                            <li>
                                <RouterLink to="/login">
                                    Login
                                </RouterLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>