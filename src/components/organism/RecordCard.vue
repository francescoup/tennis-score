<template>
  <div
    class="relative bg-blue-900 shadow-xl border-l-3 border-gray-400 grid grid-cols-2 gap-2 p-4 text-lg font-sans"
  >
    <button
      @click="deleteRecord(index)"
      class="absolute flex justify-center items-center -top-3 -right-3 h-8 w-8 rounded-full border bg-blue-900 hover:bg-gray-100 hover:text-blue-800 text-gray-100 border-gray-400 transition-colors"
    >
      <Close title="this is an icon!" />
    </button>
    <div>
      <div :class="score.playerOne == score.winner ? 'text-yellow-400' : ''">
        {{ score.playerOne ? score.playerOne : "giocatore uno" }}
      </div>
      <div :class="score.playerTwo == score.winner ? 'text-yellow-400' : ''">
        {{ score.playerTwo ? score.playerTwo : "giocatore due" }}
      </div>
    </div>
    <div class="grid grid-cols-3">
      <div class="px-4" v-for="(set, index) in score.sets" key="score.id">
        <span :class="getClass(index, set, score.sets)">{{ set }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, watch } from "vue";
import Close from "vue-material-design-icons/Close.vue";
import { useStoreMatch } from "../../store/matchs";
const storeMatch = useStoreMatch();
defineProps({
  score: Object,
  index: Number,
});
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

function deleteRecord(index) {
  storeMatch.matchs.splice(index, 1);
}
</script>

<style lang="scss" scoped></style>
