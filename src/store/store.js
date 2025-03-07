import { defineStore } from "pinia";
import { reactive } from "vue";

export const useTennisScore = defineStore("TennisScore", () => {
  const playerOne = reactive({
    nome: "Francesco",
    point: 0,
    game: 0,
    setOne: 0,
    setTow: 0,
    setThree: 0,
  });
  const playerTwo = reactive({
    nome: "Carmela",
    point: 0,
    game: 0,
    setOne: 0,
    setTow: 0,
    setThree: 0,
  });

  const increaseScore = (player) => {
    if (player === 1) {
      playerOne.point++;
    } else {
      playerTwo.point++;
    }
  };
  return { playerOne, playerTwo, increaseScore };
});
