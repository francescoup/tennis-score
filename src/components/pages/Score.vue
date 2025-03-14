<template>
  <div class="max-w-sm mx-auto p-4 h-dvh rounded-lg shadow-md">
    <RouterLink to="/test">Go to About</RouterLink>
    <h2 class="text-2xl text-center font-semibold mb-4">
      Sistema di Punteggi Tennis
    </h2>
    <!-- Punteggio dei giochi -->
    <PointScore
      :playerOnePoint="player1DisplayScore"
      :playerTwoPoint="player2DisplayScore"
    />
    <!-- Punteggio dei set -->
    <div class="flex justify-between mb-4 text-white">
      <div>
        <p class="font-semibold">
          {{ store.playerOne.nome }}
        </p>
        <p class="text-3xl">{{ player1Game }} giochi vinti</p>
      </div>
      <div>
        <p class="font-semibold">{{ store.playerTwo.nome }}</p>
        <p class="text-3xl">{{ player2Game }} giochi vinti</p>
      </div>
    </div>
    <div class="flex justify-between mb-4 text-white">
      <div>
        <p class="font-semibold">{{ player1Name }}</p>
        <p>{{ player1Sets }} set vinti</p>
      </div>
      <div>
        <p class="font-semibold">{{ player2Name }}</p>
        <p>{{ player2Sets }} set vinti</p>
      </div>
    </div>
    <div class="mb-4 grid grid-cols-2 gap-1 text-white">
      <SetsScore :pointSet="player1Set1" />
      <SetsScore :pointSet="player2Set1" />
      <SetsScore :pointSet="player1Set2" />
      <SetsScore :pointSet="player2Set2" />
      <SetsScore :pointSet="player1Set3" />
      <SetsScore :pointSet="player2Set3" />
    </div>

    <!-- Pulsanti per aumentare il punteggio -->
    <div class="mb-1 grid grid-cols-2 gap-1">
      <Button @handler="increaseScore(1)" text="player 1" intent="secondary" />
      <Button @handler="increaseScore(2)" text="Player 2" intent="secondary" />
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
  tieBreack.value ? player1Score.value : scoreMap[player1Score.value]
);
const player2DisplayScore = computed(() =>
  tieBreack.value ? player2Score.value : scoreMap[player2Score.value]
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
