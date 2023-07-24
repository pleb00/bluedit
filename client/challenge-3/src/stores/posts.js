import axios from "axios";
import { defineStore } from "pinia";
const baseUrl = "http://localhost:3000";

export const usePostsStore = defineStore("post", {
  state: () => ({
    baseUrl,
    posts: [],
    postById: {},
    currentPage: 1,
    totalPosts: 0,
    maxPage: 1,
    query: "",
    totalPage: 1,
  }),
  actions: {
    async fetchPosts(page, search) {
      if (!search || search === "") {
        this.query = `?count=5&page=${page}`;
        this.currentPage = page;
      } else {
        this.query = `?search=${search}`;
      }
      try {
        const data = await axios.get(`${this.baseUrl}/pub/posts${this.query}`);

        this.posts = data.data.data.posts;
        this.totalPage = data.data.data.totalPage;
      } catch (err) {
        console.log(err);
      }
    },
  },
});

export const useDetailStore = defineStore("detail", {
  state: () => ({
    baseUrl,
    postById: {},
  }),
  actions: {
    async fetchDetails(id) {
      try {
        const data = await axios.get(`${this.baseUrl}/pub/posts/${id}`);
        console.log(data);
        this.postById = data.data.data;
        this.totalPost = data.data.data.totalPost;
        this.page = data.data.data.page;
      } catch (err) {
        console.log(err);
      }
    },
  },
});
