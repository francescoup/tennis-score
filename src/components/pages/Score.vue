<template>
  <div class="max-w-sm mx-auto p-4 h-dvh rounded-lg shadow-md">
    <div v-if="store.openModal">
      <ModalCopy>
        <span class="text-black">the winner is {{ store.isWinner }}</span>
        <Button
          text="chiusi"
          intent="modal"
          @handler="() => (store.openModal = false)"
        />
        <button @click="() => (store.openModal = false)">chidi</button>
      </ModalCopy>
    </div>
    <!-- Punteggio dei giochi -->
    <PointScore
      :playerOnePoint="player1DisplayScore"
      :playerTwoPoint="player2DisplayScore"
    />
    <!-- Punteggio dei set -->
    <div class="text-center w-full text-sm text-gray-500">Game vinti</div>
    <div class="flex justify-between mb-4 text-white">
      <div class="w-full text-center">
        <p class="text-sm text-amber-300">
          {{ store.playerOne.nome }}
        </p>
        <p class="text-3xl">{{ store.playerOne.game }}</p>
      </div>
      <div class="w-full text-center">
        <p class="text-sm text-amber-300">{{ store.playerTwo.nome }}</p>
        <p class="text-3xl">{{ store.playerTwo.game }}</p>
      </div>
    </div>
    <div class="text-center w-full text-sm text-gray-500">Set vinti</div>
    <div class="flex justify-evenly mb-4 text-gray-300">
      <div class="w-full text-lg text-center text-gray-400">
        <p>{{ store.playerOne.sets }}</p>
      </div>
      <div class="w-full text-lg text-center text-gray-400">
        <p>{{ store.playerTwo.sets }}</p>
      </div>
    </div>
    <div class="grid grid-cols-1">
      <span class="text-center w-full text-sm text-gray-500">set 1</span>
      <div class="mb-4 grid grid-cols-2 gap-1 text-white">
        <SetsScore :pointSet="store.playerOne.setOne" />
        <SetsScore :pointSet="store.playerTwo.setOne" />
      </div>
      <span class="text-center w-full text-sm text-gray-500">set 2</span>
      <div class="mb-4 grid grid-cols-2 gap-1 text-white">
        <SetsScore :pointSet="store.playerOne.setTwo" />
        <SetsScore :pointSet="store.playerTwo.setTwo" />
      </div>
      <span class="text-center w-full text-sm text-gray-500">set 3</span>
      <div class="mb-4 grid grid-cols-2 gap-1 text-white">
        <SetsScore :pointSet="store.playerOne.setThree" />
        <SetsScore :pointSet="store.playerTwo.setThree" />
      </div>
    </div>

    <!-- Pulsanti per aumentare il punteggio -->
    <div class="mb-1 grid grid-cols-2 gap-1">
      <Button
        @handler="store.increaseScore(1)"
        text="player 1"
        intent="secondary"
      />
      <Button
        @handler="store.increaseScore(2)"
        text="Player 2"
        intent="secondary"
      />
    </div>

    <!-- Pulsante per resettare il punteggio -->
    <div class="grid grid-cols-2 gap-1">
      <Button @handler="resetScore" text="reset" intent="secondary" />
      <Button @handler="undoAction" text="undo" intent="secondary" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useTennisScore } from "../../store/store";
const store = useTennisScore();
import ModalCopy from "../organism/Modal copy.vue";

// Stati reattivi per i punteggi dei giochi

import PointScore from "../molecules/PointScore.vue";
import Button from "../atoms/Button.vue";
import SetsScore from "../molecules/SetsScore.vue";
const player1Score = ref(0);
const player2Score = ref(0);

// Stat reattivi per i game vinti
const player1Game = ref(0);
const player2Game = ref(0);

// Stati reattivi per i set vinti
const player1Sets = ref(0);
const player2Sets = ref(0);

// Game singoli sets
const player1Set1 = ref(0);
const player2Set1 = ref(0);
const player1Set2 = ref(0);
const player2Set2 = ref(0);
const player1Set3 = ref(0);
const player2Set3 = ref(0);

// Nomi dei giocatori
const player1Name = "Giocatore 1";
const player2Name = "Giocatore 2";

// Mappa per il punteggio dei giochi
const scoreMap = [0, 15, 30, 40, "A", "Vittoria"];

// Computed properties per visualizzare i punteggi dei giochi
const player1DisplayScore = computed(() =>
  store.isTieBreack ? store.playerOne.point : scoreMap[store.playerOne.point]
);
const player2DisplayScore = computed(() =>
  store.isTieBreack ? store.playerTwo.point : scoreMap[store.playerTwo.point]
);
// active user
const activeUser = ref(0);
// Tie Breack
const tieBreack = ref(false);
// Deuce
const isDeuce = ref(false);

// Funzione per aumentare il punteggio di un giocatore nel gioco
const increaseScore = (player) => {
  activeUser.value = player;
  if (
    player === 1 &&
    (tieBreack.value === true
      ? player1Score.value <= 100
      : player1Score.value < 5)
  ) {
    isDeuce.value = false;
    player1Score.value++;
  }
  if (
    player === 2 &&
    (tieBreack.value === true
      ? player2Score.value <= 100
      : player2Score.value < 5)
  ) {
    isDeuce.value = false;
    player2Score.value++;
  }

  // Controllo per la vittoria di un gioco (4 punti o 7 punti in caso di tiebrack)
  if (
    (tieBreack.value === true
      ? player1Score.value >= 7
      : player1Score.value >= 4) &&
    player1Score.value - player2Score.value >= 2
  ) {
    player1Score.value = 0;
    player2Score.value = 0;
    player1Game.value++;

    checkForSetWinner(player);
  } else if (
    (tieBreack.value === true
      ? player2Score.value >= 7
      : player2Score.value >= 4) &&
    player2Score.value - player1Score.value >= 2
  ) {
    player1Score.value = 0;
    player2Score.value = 0;
    player2Game.value++;

    checkForSetWinner(player);
  } else if (
    tieBreack.value === false &&
    player1Score.value >= 3 &&
    player1Score.value === player2Score.value
  ) {
    isDeuce.value = true;
    player1Score.value = 3;
    player2Score.value = 3;
    console.log("deuce");
  }
};
// Funzione per controllare se un giocatore ha vinto un set
const checkForSetWinner = (player) => {
  // Verifica se un giocatore ha vinto un set (6 giochi con almeno 2 di vantaggio)
  if (
    tieBreack.value === true
      ? player === 1 && player1Game.value === 7
      : player === 1 &&
        player1Game.value >= 6 &&
        player1Game.value - player2Game.value >= 2
  ) {
    player1Sets.value++;
    storeSets(player);
    player1Score.value = 0;
    player2Score.value = 0;
    player1Game.value = 0;
    player2Game.value = 0;
    tieBreack.value = false;
  } else if (
    tieBreack.value === true
      ? player === 2 && player2Game.value === 7
      : player === 2 &&
        player2Game.value >= 6 &&
        player2Game.value - player1Game.value >= 2
  ) {
    player2Sets.value++;
    storeSets(player);
    player1Game.value = 0;
    player2Game.value = 0;
    player1Score.value = 0;
    player2Score.value = 0;
    tieBreack.value = false;
  } else if (
    player1Game.value === 6 &&
    player2Game.value === 6 &&
    player1Game.value === player2Game.value
  ) {
    tieBreack.value = true;
  }

  // Controllo per la vittoria della partita (2 set)
  if (player1Sets.value === 2) {
    alert(`${player1Name} ha vinto la partita! ${player2Set2.value}`);
    resetScore();
  } else if (player2Sets.value === 2) {
    alert(`${player2Name} ha vinto la partita!`);
    resetScore();
  }
};

function storeSets(player) {
  console.log(player1Sets.value);
  if (
    (player1Sets.value === 1 && player2Sets.value === 0) ||
    (player2Sets.value === 1 && player1Sets.value === 0)
  ) {
    player1Set1.value = player1Game.value;
    player2Set1.value = player2Game.value;
  } else if (
    (player1Sets.value === 1 && player2Sets.value === 1) ||
    (player1Sets.value === 2 && player2Sets.value === 0) ||
    (player2Sets.value === 2 && player1Sets.value === 0)
  ) {
    player1Set2.value = player1Game.value;
    player2Set2.value = player2Game.value;
  } else {
    player1Set3.value = player1Game.value;
    player2Set3.value = player2Game.value;
  }
}

// Funzione per resettare il punteggio
const resetScore = () => {
  player1Score.value = 0;
  player2Score.value = 0;
  player1Sets.value = 0;
  player2Sets.value = 0;
};

const undoAction = () => {
  if (activeUser.value === 1 && player1Score.value > 0) {
    player1Score.value--;
  } else if (activeUser.value === 2 && player2Score.value > 0) {
    player2Score.value--;
  }
};
</script>

<style scoped>
/* Puoi personalizzare lo stile qui se necessario */
</style>
