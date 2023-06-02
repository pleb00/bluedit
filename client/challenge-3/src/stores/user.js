import axios from "axios";
import { defineStore } from "pinia";
import Swal from "sweetalert2";
const baseUrl = "http://localhost:3000";

export const useLoginStore = defineStore("login", {
  state: () => ({
    baseUrl,
    email: "",
    password: "",
    isLoggedIn: false,
  }),
  actions: {
    async login(email, password) {
      try {
        const data = await axios.post(`${this.baseUrl}/pub/login`, {
          email,
          password,
        });
        localStorage.setItem("access_token", data.data.data.access_token);
        this.isLoggedIn = true;
        this.router.push("/");
        Swal.fire({
          icon: "success",
          title: "Login success!",
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: err.response.data.data,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    },

    async register(email, password) {
      try {
        const data = await axios.post(`${this.baseUrl}/pub/register`, {
          email,
          password,
        });
        Swal.fire({
          icon: "success",
          title: data.data.message,
          showConfirmButton: false,
          timer: 1500,
        });
        this.router.push("/");
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: err.response.data.data,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    },

    async googleLoginHandler(response) {
      try {
        const data = await axios.post(
          `${this.baseUrl}/pub/googleLogin`,
          response,
          {
            headers: {
              google_token: response.credential,
            },
          }
        );

        localStorage.setItem("access_token", data.data.data.access_token);
        this.isLoggedIn = true;
        this.router.push("/");
        Swal.fire({
          icon: "success",
          title: "Login success!",
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Something went wrong!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    },
  },
});

export const useLogoutStore = defineStore("logout", {
  state: () => ({
    baseUrl,
    postById: {},
  }),
  actions: {
    async fetchDetails(id) {
      try {
        const data = await axios.get(`${this.baseUrl}/pub/posts/${id}`);
        this.postById = data.data.data;
      } catch (err) {
        console.log(err);
      }
    },
  },
});
