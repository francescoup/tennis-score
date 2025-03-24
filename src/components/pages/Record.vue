<template>
  <div
    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-8 min-h-screen text-gray-200"
  >
    <!-- <RouterLink to="/">home</RouterLink> -->

    <!-- <ModalCopy>
      <Input />
    </ModalCopy> -->

    <div v-if="!tennis">nessun dato salvato</div>
    <div
      v-else
      class="border border-gray-800 flex gap-2 p-4 rounded-lg"
      v-for="item in tennis.matchs.matchs"
      key="item.id"
    >
      <div>
        <div
          :class="
            item.playerOne == tennis.TennisScore.isWinner
              ? 'text-yellow-400'
              : ''
          "
        >
          {{ item.playerOne ? item.playerOne : "giocatore uno" }}
        </div>
        <div
          :class="
            item.playerTwo == tennis.TennisScore.isWinner
              ? 'text-yellow-400'
              : ''
          "
        >
          {{ item.playerTwo ? item.playerTwo : "giocatore due" }}
        </div>
      </div>
      <div class="grid grid-rows-2 grid-cols-3">
        <div class="px-4" v-for="(set, index) in item.sets" key="item.id">
          <span :class="getClass(index, set, item.sets)">{{ set }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from "vue-router";
import { useTennisScore } from "../../store/store";
import ModalCopy from "../organism/Modal copy.vue";
import Input from "../atoms/Input.vue";

const store = useTennisScore();

let tennis = JSON.parse(localStorage.getItem("state"));

//Definisce una classe specifica per chi vince un set

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
</script>
