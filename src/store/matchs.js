import { defineStore } from "pinia";
import { ref } from "vue";

export const useStoreMatch = defineStore("matchs", () => {
  const matchs = ref([]);

  const storeMatchs = (val) => {
    matchs.value.push(val);
  };
  return { matchs, storeMatchs };
});
