import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { createRouter, createWebHashHistory } from "vue-router";
import LoginPage from "./components/LoginPage.vue";
import HomePage from "./components/HomePage.vue";
import CreateAcc from "./components/CreateAcc.vue";
import Scheduale from "./components/Scheduale.vue";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: "/", component: LoginPage },
    { path: "/home", component: HomePage },
    { path: "/register", component: CreateAcc },
    { path: "/scheduale", component: Scheduale },
  ],
});

const app = createApp(App);

app.use(router);
app.mount("#app");
