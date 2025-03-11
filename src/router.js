import { createWebHistory, createRouter } from "vue-router";

import Home from "./components/pages/Home.vue";
import Score from "./components/pages/Score.vue";
import Test from "./components/pages/Test.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/score", component: Score },
  { path: "/test", component: Test },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
