import { defineStore } from "pinia";
import { reactive, ref, computed } from "vue";

export const useTennisScore = defineStore("TennisScore", () => {
  const playerOne = reactive({
    nome: "",
    point: 0,
    game: 0,
    sets: 0,
    setOne: 0,
    setTwo: 0,
    setThree: 0,
  });
  const playerTwo = reactive({
    nome: "",
    point: 0,
    game: 0,
    sets: 0,
    setOne: 0,
    setTwo: 0,
    setThree: 0,
  });
  // active player
  const isActivePlayer = ref(0);
  // Tie Breack
  const isTieBreack = ref(false);
  // Deuce
  const isDeuce = ref(false);
  // winner
  const isWinner = ref("");
  // Modal if winner
  const openModal = ref(false);

  // Logic for point and set
  const increaseScore = (player) => {
    isActivePlayer.value = player;
    if (
      player === 1 &&
      (isTieBreack.value === true
        ? playerOne.point <= 100
        : playerOne.point < 5)
    ) {
      isDeuce.value = false;
      playerOne.point++;
    } else if (
      player === 2 &&
      (isTieBreack.value === true
        ? playerTwo.point <= 100
        : playerTwo.point < 5)
    ) {
      isDeuce.value = false;
      playerTwo.point++;
    }
    if (
      (isTieBreack.value === true
        ? playerOne.point >= 7
        : playerOne.point >= 4) &&
      playerOne.point - playerTwo.point >= 2
    ) {
      playerOne.point = 0;
      playerTwo.point = 0;
      playerOne.game++;
      checkForSetWinner(player);

      // checkForSetWinner(player);
    } else if (
      (isTieBreack.value === true
        ? playerTwo.point >= 7
        : playerTwo.point >= 4) &&
      playerTwo.point - playerOne.point >= 2
    ) {
      playerOne.point = 0;
      playerTwo.point = 0;
      playerTwo.game++;
      checkForSetWinner(player);

      // checkForSetWinner(player);
    } else if (
      isTieBreack.value === false &&
      playerOne.point >= 3 &&
      playerOne.point === playerTwo.point
    ) {
      isDeuce.value = true;
      playerOne.point = 3;
      playerTwo.point = 3;
      console.log("deuce");
    }
  };
  //check for winner
  const checkForSetWinner = (player) => {
    // Verifica se un giocatore ha vinto un set (6 giochi con almeno 2 di vantaggio)
    if (
      isTieBreack.value === true
        ? player === 1 && playerOne.game === 7
        : player === 1 &&
          playerOne.game >= 6 &&
          playerOne.game - playerTwo.game >= 2
    ) {
      playerOne.sets++;
      storeSets(player);
      playerOne.point = 0;
      playerTwo.point = 0;
      playerOne.game = 0;
      playerTwo.game = 0;
      isTieBreack.value = false;
    } else if (
      isTieBreack.value === true
        ? player === 2 && playerTwo.game === 7
        : player === 2 &&
          playerTwo.game >= 6 &&
          playerTwo.game - playerOne.game >= 2
    ) {
      playerTwo.sets++;
      storeSets(player);
      playerOne.game = 0;
      playerTwo.game = 0;
      playerOne.point = 0;
      playerTwo.point = 0;
      isTieBreack.value = false;
    } else if (
      playerOne.game === 6 &&
      playerTwo.game === 6 &&
      playerOne.game === playerTwo.game
    ) {
      isTieBreack.value = true;
    }

    // Controllo per la vittoria della partita (2 set)
    if (playerOne.sets === 2) {
      openModal.value = true;
      isWinner.value = playerOne.nome;
      //resetScore();
    } else if (playerTwo.sets === 2) {
      openModal.value = true;
      isWinner.value = playerTwo.nome;
      //resetScore();
    }
  };
  //store results
  function storeSets(player) {
    if (
      (playerOne.sets === 1 && playerTwo.sets === 0) ||
      (playerTwo.sets === 1 && playerOne.sets === 0)
    ) {
      playerOne.setOne = playerOne.game;
      playerTwo.setOne = playerTwo.game;
    } else if (
      (playerOne.sets === 1 && playerTwo.sets === 1) ||
      (playerOne.sets === 2 && playerTwo.sets === 0) ||
      (playerTwo.sets === 2 && playerOne.sets === 0)
    ) {
      playerOne.setTwo = playerOne.game;
      playerTwo.setTwo = playerTwo.game;
    } else {
      playerOne.setThree = playerOne.game;
      playerTwo.setThree = playerTwo.game;
    }
  }

  //reset match
  const resetScore = () => {
    playerOne.nome = "";
    playerTwo.nome = "";
    playerOne.game = 0;
    playerTwo.game = 0;
    playerOne.setOne = 0;
    playerOne.setTwo = 0;
    playerOne.setThree = 0;
    playerTwo.setOne = 0;
    playerTwo.setTwo = 0;
    playerTwo.setThree = 0;
    playerOne.sets = 0;
    playerTwo.sets = 0;
  };

  const undoAction = () => {
    if (isActivePlayer.value === 1 && playerOne.point > 0) {
      playerOne.point--;
    } else if (isActivePlayer.value === 2 && playerTwo.point > 0) {
      playerTwo.point--;
    }
  };

  return {
    playerOne,
    playerTwo,
    isTieBreack,
    openModal,
    isWinner,
    increaseScore,
    resetScore,
    undoAction,
  };
});
