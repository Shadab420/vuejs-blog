import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../pages/Home.vue";
import Login from "../pages/Auth/Login.vue";
import Register from "../pages/Auth/Register.vue";

export type AppRouteNames =
  | "home"
  | "create post"
  | "login"
  | "register"
  | "profile"
  | "logout";

const routes: Array<RouteRecordRaw> = [
  {
    name: "home",
    path: "/",
    component: Home,
  },
  {
    name: "create post",
    path: "/cp",
    component: Home,
  },
  {
    name: "login",
    path: "/login",
    component: Login,
  },
  {
    name: "register",
    path: "/register",
    component: Register,
  },
  {
    name: "profile",
    path: "/profile",
    component: Home,
  },
  {
    name: "logout",
    path: "/",
    component: Home,
  },
  {
    name: "post",
    path: "/post/:postId",
    component: () => import("../pages/Post.vue"),
  },
  // {
  //   name: "edit-article",
  //   path: "/article/:slug/edit",
  //   component: () => import("./pages/EditArticle.vue"),
  // },
  // {
  //   name: "create-article",
  //   path: "/article/create",
  //   component: () => import("./pages/EditArticle.vue"),
  // },
  // {
  //   name: "login",
  //   path: "/login",
  //   component: () => import("./pages/Login.vue"),
  // },
  // {
  //   name: "register",
  //   path: "/register",
  //   component: () => import("./pages/Register.vue"),
  // },
  // {
  //   name: "profile",
  //   path: "/profile/:username",
  //   component: () => import("./pages/Profile.vue"),
  // },
  // {
  //   name: "profile-favorites",
  //   path: "/profile/:username/favorites",
  //   component: () => import("./pages/Profile.vue"),
  // },
  // {
  //   name: "settings",
  //   path: "/settings",
  //   component: () => import("./pages/Settings.vue"),
  // },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
