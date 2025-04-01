<template>
  <div class="w-screen flex justify-center items-center p-4 min-h-screen">
    <div v-if="store.openModal">
      <ModalCopy @handlerModal="store.openModal = false">
        <div class="flex flex-col gap-2">
          <div>
            <span class="text-3xl flex justify-center">The winner is</span>
            <span class="text-3xl flex justify-center">{{
              store.isWinner
            }}</span>
          </div>

          <div class="w-full flex justify-center">
            <tennis-ball
              title="this is an icon!"
              fillColor="oklch(0.75 0.183 55.934)"
            />
          </div>
          <Button
            text="chiudi"
            intent="modal"
            @handler="() => (store.openModal = false)"
          />
          <Button
            text="Salva il punteggio"
            intent="modal"
            @handler="
              match.storeMatchs({
                id: idMatch++,
                winner: store.isWinner,
                playerOne: store.playerOne.nome,
                playerTwo: store.playerTwo.nome,
                sets: [
                  store.playerOne.setOne,
                  store.playerOne.setTwo,
                  store.playerOne.setThree,
                  store.playerTwo.setOne,
                  store.playerTwo.setTwo,
                  store.playerTwo.setThree,
                ],
              })
            "
          />
        </div>
      </ModalCopy>
    </div>
    <div
      class="w-full grid grid-cols-1 md:grid-cols-6 lg:grid-cols-1 min-lg:items-center lg:w-1/3 h-auto"
    >
      <!-- nome dei giocatore -->
      <div>
        <div
          class="hidden md:block lg:hidden w-full text-sm text-gray-400 text-center"
        >
          Giocatori
        </div>
        <div class="grid grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
          <NameScore :nome="store.playerOne.nome" />
          <NameScore :nome="store.playerTwo.nome" />
        </div>
      </div>
      <!-- Punteggio dei giochi -->
      <PointScore
        :playerOnePoint="player1DisplayScore"
        :playerTwoPoint="player2DisplayScore"
      />
      <!-- Punteggio dei set -->
      <div>
        <div class="text-center w-full text-sm text-gray-500">Game vinti</div>
        <div
          class="grid grid-cols-2 md:grid-cols-1 lg:grid-cols-2 mb-4 text-white"
        >
          <div class="w-full text-center">
            <p class="text-3xl md:text-2xl">{{ store.playerOne.game }}</p>
          </div>
          <div class="w-full text-center">
            <p class="text-3xl md:text-2xl">{{ store.playerTwo.game }}</p>
          </div>
        </div>
      </div>
      <div>
        <div class="text-center w-full text-sm text-gray-500">Set vinti</div>
        <div
          class="grid-cols-2 grid md:grid-cols-1 lg:grid-cols-2 mb-4 text-gray-300"
        >
          <div class="w-full text-center text-2xl text-gray-400">
            <p>{{ store.playerOne.sets }}</p>
          </div>
          <div class="w-full text-2xl text-center text-gray-400">
            <p>{{ store.playerTwo.sets }}</p>
          </div>
        </div>
      </div>

      <!-- punteggio sets -->

      <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-1">
        <div>
          <div class="text-center w-full text-sm text-gray-500">set 1</div>
          <div
            class="mb-4 grid grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-1 md:gap-x-1 md:gap-y-0 lg:gap-1 text-white"
          >
            <SetsScore :pointSet="store.playerOne.setOne" />
            <SetsScore :pointSet="store.playerTwo.setOne" />
          </div>
        </div>
        <div>
          <div class="text-center w-full text-sm text-gray-500">set 2</div>
          <div
            class="mb-4 grid grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-1 md:gap-x-1 md:gap-y-0 lg:gap-1 text-white"
          >
            <SetsScore :pointSet="store.playerOne.setTwo" />
            <SetsScore :pointSet="store.playerTwo.setTwo" />
          </div>
        </div>
        <div>
          <div class="text-center w-full text-sm text-gray-500">set 3</div>
          <div
            class="mb-4 grid grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-1 md:gap-x-1 md:gap-y-0 lg:gap-1 text-white"
          >
            <SetsScore :pointSet="store.playerOne.setThree" />
            <SetsScore :pointSet="store.playerTwo.setThree" />
          </div>
        </div>
      </div>

      <!-- Pulsanti per aumentare il punteggio -->
      <div
        class="mb-1 min-lg:mb-0 grid grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-1"
      >
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
      <div class="grid grid-cols-2 md:col-span-6 lg:col-span-1 gap-1">
        <Button
          :icon="Restart"
          @handler="store.resetScore()"
          text="reset"
          intent="secondary"
        />
        <Button
          :icon="UndoVariant"
          @handler="store.undoAction()"
          text="undo"
          intent="secondary"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, reactive } from "vue";
import { useTennisScore } from "../../store/store";
import { useStoreMatch } from "../../store/matchs";
import ModalCopy from "../organism/Modal copy.vue";
import PointScore from "../molecules/PointScore.vue";
import Button from "../atoms/Button.vue";
import SetsScore from "../molecules/SetsScore.vue";
import NameScore from "../molecules/NameScore.vue";
import TennisBall from "vue-material-design-icons/TennisBall.vue";
import UndoVariant from "vue-material-design-icons/UndoVariant.vue";
import Restart from "vue-material-design-icons/Restart.vue";

const store = useTennisScore();
const match = useStoreMatch();
const idMatch = ref(1);

// Mappa per il punteggio dei giochi
const scoreMap = [0, 15, 30, 40, "A", "Vittoria"];

// Computed properties per visualizzare i punteggi dei giochi
const player1DisplayScore = computed(() =>
  store.isTieBreack ? store.playerOne.point : scoreMap[store.playerOne.point]
);
const player2DisplayScore = computed(() =>
  store.isTieBreack ? store.playerTwo.point : scoreMap[store.playerTwo.point]
);

store.openModal = false;
</script>
