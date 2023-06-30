import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import Toast from "vue-toastification";

const app = createApp(App);

app.use(router);
app.use(Toast,{ maxToasts: 3});

app.mount("#app");
