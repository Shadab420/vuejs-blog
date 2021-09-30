import { createApp } from "vue";
import App from "./App.vue";
import PrimeVue from "primevue/config";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Menubar from "primevue/menubar";
import Toast from "primevue/toast";
import ToastService from "primevue/toastservice";

// primevue themes and styles and primeicons.
import "primevue/resources/themes/mdc-light-indigo/theme.css"; //theme
import "primevue/resources/primevue.min.css"; //core css
import "primeicons/primeicons.css"; //icons

const app = createApp(App);

// use things in app
app.use(store);
app.use(router);
app.use(PrimeVue);
app.use(ToastService);

// use primevue components.
app.component("Button", Button);
app.component("InputText", InputText);
app.component("Menubar", Menubar);
app.component("Toast", Toast);
app.mount("#app");
