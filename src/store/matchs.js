import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";
import { ref, watch } from "vue";

export const useStoreMatch = defineStore("matchs", () => {
  const matchs = useStorage("matchs", []);

  const storeMatchs = (val) => {
    matchs.value.push(val);
  };

  return { matchs, storeMatchs };
});
