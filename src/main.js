import { createApp } from "vue";
import App from "./App.vue";
import axios from "axios";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootswatch/dist/cyborg/bootstrap.min.css"; // lumen, or cyborg

import "@/css/style.css";

const app = createApp(App);

app.config.globalProperties.axios = axios;

app.mount("#app");
