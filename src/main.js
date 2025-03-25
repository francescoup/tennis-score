import { createApp, watch } from "vue";
import router from "./router";
import { createPinia } from "pinia";

import "./style.css";
import App from "./App.vue";

const pinia = createPinia();
if (localStorage.getItem("state")) {
  pinia.state.value = JSON.parse(localStorage.getItem("state"));
}
watch(
  pinia.state,
  (state) => {
    localStorage.setItem("state", JSON.stringify(state));
  },
  { deep: true }
);
createApp(App).use(router).use(pinia).mount("#app");
