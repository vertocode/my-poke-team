import { createApp } from "vue";
import App from "./App.vue";
import { router } from "./router";
import store from "./store/store";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

const app = createApp(App);
app.use(router);
app.use(store);
app.mount("#app");
