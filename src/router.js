import { createWebHistory, createRouter } from "vue-router";

import Home from "./components/pages/Home.vue";
import Score from "./components/pages/Score.vue";
import Record from "./components/pages/Record.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/score", component: Score },
  { path: "/record", component: Record },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
