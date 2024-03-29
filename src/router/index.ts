import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/tools",
      name: "tools",
      component: () => import("../views/Tools.vue"),
    },
    {
      path: "/:catchAll(.*)*",
      component: () => import("../views/Tools.vue"),
    },
  ],
});

export default router;
