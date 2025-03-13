<template>
  <div class="text-white">
    <RouterLink to="/score">score</RouterLink>
    esempio

    <p>{{ player1DisplayScore }}</p>
    <p>{{ player2DisplayScore }}</p>
    <p>{{ playerOne.game }}</p>
    <p>{{ playerTwo.game }}</p>
    <p>{{ playerOne.nome }}</p>
    <p>{{ playerTwo.nome }}</p>
    <button @click="increaseScore(1)">clicca</button>
    <button @click="increaseScore(2)">clicca</button>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { RouterLink } from "vue-router";
import { useTennisScore } from "../../store/store";
import Input from "../atoms/Input.vue";
const { playerOne, playerTwo, increaseScore } = useTennisScore();
const scoreMap = [0, 15, 30, 40, "A", "Vittoria"];
const player1DisplayScore = computed(() => scoreMap[playerOne.point]);
const player2DisplayScore = computed(() => scoreMap[playerTwo.point]);
</script>

<style lang="scss" scoped></style>
