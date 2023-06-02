import axios from "axios";
import { defineStore } from "pinia";
import Swal from "sweetalert2";
const baseUrl = "http://localhost:3000";

export const useBookmarkStore = defineStore("bookmark", {
  state: () => ({
    baseUrl,
    bookmarks: [],
  }),
  actions: {
    async fetchBookmark() {
      try {
        const data = await axios.get(`${this.baseUrl}/pub/bookmarks`, {
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        });
        this.bookmarks = data.data.data;
      } catch (err) {
        console.log(err);
      }
    },

    async addBookmark(id) {
      try {
        const data = await axios.get(`${this.baseUrl}/pub/bookmarks/${id}`, {
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        });

        if (data.data.data[1] === true) {
          Swal.fire({
            icon: "success",
            title: "Post added to bookmark!",
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Post already in your bookmark!",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
});
