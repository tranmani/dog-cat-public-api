import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/random",
    name: "random",
    component: () => import("../views/Random.vue"),
  },
  {
    path: "/detail",
    name: "detail",
    component: () => import("../views/Detail.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
