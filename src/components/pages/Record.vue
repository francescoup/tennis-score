<template>
  <main class="bg-blue-700 min-h-screen">
    <div
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-8 text-gray-200"
    >
      <!-- <RouterLink to="/">home</RouterLink> -->

      <!-- <ModalCopy>
      <Input />
    </ModalCopy> -->

      <div v-if="storeMatch.matchs.length == 0">nessun dato salvato</div>
      <div
        v-else
        class="border relative border-gray-400 row-span-1 flex gap-2 p-4 rounded-lg"
        v-for="(item, index) in storeMatch.matchs"
        key="item.id"
      >
        <button
          class="absolute flex justify-center items-center -top-3 -right-3 h-8 w-8 rounded-full border bg-blue-800 hover:bg-gray-100 hover:text-blue-800 text-gray-100 border-gray-400 transition-colors"
          @click="canc(index)"
        >
          <Close title="this is an icon!" />
        </button>
        <div>
          <div :class="item.playerOne == item.winner ? 'text-yellow-400' : ''">
            {{ item.playerOne ? item.playerOne : "giocatore uno" }}
          </div>
          <div :class="item.playerTwo == item.winner ? 'text-yellow-400' : ''">
            {{ item.playerTwo ? item.playerTwo : "giocatore due" }}
          </div>
        </div>
        <div class="grid grid-cols-3">
          <div class="px-4" v-for="(set, index) in item.sets" key="item.id">
            <span :class="getClass(index, set, item.sets)">{{ set }}</span>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { watch } from "vue";
import { RouterLink } from "vue-router";
import { useTennisScore } from "../../store/store";
import { useStoreMatch } from "../../store/matchs";
import ModalCopy from "../organism/Modal copy.vue";
import Input from "../atoms/Input.vue";
import Close from "vue-material-design-icons/Close.vue";

const store = useTennisScore();
const storeMatch = useStoreMatch();

let tennis = JSON.parse(localStorage.getItem("state"));

//Definisce una classe specifica per chi vince un set
function canc(index) {
  storeMatch.matchs.splice(index, 1);
}
const getClass = (index, set, sets) => {
  if (index === 0 && set > sets[3]) {
    return "text-yellow-400"; // Primo vs quarto
  } else if (index === 1 && set > sets[4]) {
    return "text-yellow-400"; // Secondo vs quinto
  } else if (index === 2 && set > sets[5]) {
    return "text-yellow-400"; // Terzo vs sesto
  } else if (index === 3 && set > sets[0]) {
    return "text-yellow-400"; // Quarto vs primo
  } else if (index === 4 && set > sets[1]) {
    return "text-yellow-400"; // Quinto vs secondo
  } else if (index === 5 && set > sets[2]) {
    return "text-yellow-400"; // Sesto vs terzo
  }
  return ""; // Nessuna classe se non è maggiore
};

watch(
  () => storeMatch.matchs,
  (state) => {
    localStorage.setItem("test", JSON.stringify(state));
  },
  { deep: true, immediate: true }
);
if (localStorage.getItem("test")) {
  storeMatch.matchs.value = JSON.parse(localStorage.getItem("test"));
}
// watch(
//   match.matchs,
//   (state) => {
//     localStorage.setItem("state", JSON.stringify(state));
//   },
//   { deep: true }
// );
</script>
