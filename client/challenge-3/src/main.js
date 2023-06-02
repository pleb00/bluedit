import "./assets/style.css";
import { createApp } from "vue";
import { createPinia } from "pinia";
import { markRaw } from "vue";
import vue3GoogleLogin from "vue3-google-login";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);
const pinia = createPinia();

pinia.use(({ store }) => {
  store.router = markRaw(router);
});

app.use(vue3GoogleLogin, {
  clientId:
    "608042006497-hccsgcpe717ftfrl1s45aed6hhta1lsl.apps.googleusercontent.com",
});

app.use(pinia);
app.use(router);

app.mount("#app");
