import { defineStore } from "pinia";
import { reactive, ref, computed } from "vue";

export const useTennisScore = defineStore("TennisScore", () => {
  const playerOne = reactive({
    nome: "",
    point: 0,
    game: 0,
    setOne: 0,
    setTow: 0,
    setThree: 0,
  });
  const playerTwo = reactive({
    nome: "",
    point: 0,
    game: 0,
    setOne: 0,
    setTow: 0,
    setThree: 0,
  });
  // active player
  const isActivePlayer = ref(0);
  // Tie Breack
  const isTieBreack = ref(false);
  // Deuce
  const isDeuce = ref(false);

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

      // checkForSetWinner(player);
    }
  };

  return { playerOne, playerTwo, increaseScore };
});
