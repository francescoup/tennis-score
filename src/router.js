import { createWebHistory, createRouter } from "vue-router";

import Test from "./components/pages/Test.vue";
import Score from "./components/pages/Score.vue";

const routes = [
  { path: "/", component: Test },
  { path: "/score", component: Score },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
