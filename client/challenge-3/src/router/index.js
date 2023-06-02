import { createRouter, createWebHistory } from "vue-router";
import AboutView from "../views/AboutView.vue";
import LoginView from "../views/LoginView.vue";
import PostsView from "../views/PostsView.vue";
import DetailsView from "../views/DetailsView.vue";
import BookmarkView from "../views/BookmarkView.vue";
import Swal from "sweetalert2";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: PostsView,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/details/:id",
      name: "postDetails",
      component: DetailsView,
    },
    {
      path: "/bookmark",
      name: "bookmark",
      component: BookmarkView,
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.name === "bookmark" && !localStorage.access_token) {
    next("/login");
  } else if (to.name === "login" && localStorage.access_token) {
    next("/");
  } else {
    next();
  }
});

export default router;
