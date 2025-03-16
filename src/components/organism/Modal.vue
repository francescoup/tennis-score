<template>
  <div
    class="h-screen w-full bg-gray-800/50 absolute top-0 left-0 p-5 flex justify-center items-start md:items-center"
    aria-labelledby="inizia partita"
    role="dialog"
    aria-modal="true"
  >
    <div class="w-full h-auto md:w-86 bg-white p-10 rounded-xl shadow-2xl">
      Test modal title
      <div class="flex flex-col gap-2">
        <!-- <Input v-model="playerOne.nome" />
        <Input v-model="playerTwo.nome" /> -->

        <Inputtest
          v-model:firstName="playerOne.nome"
          label="Giocatore uno"
          placeHolder="inserisci il tuo nome"
        />
        <Inputtest v-model:firstName="playerTwo.nome" label="Giocatore due" />
        <Button
          @handler="closeModal"
          text="Inizia la partita"
          intent="modal"
          :disabled="playerOne.nome && playerTwo.nome ? false : true"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import Button from "../atoms/Button.vue";
import Input from "../atoms/Input.vue";
import Inputtest from "../atoms/Inputtest.vue";
import { useTennisScore } from "../../store/store";
const { playerOne, playerTwo } = useTennisScore();

const emit = defineEmits(["handlerModal"]);

function closeModal() {
  emit("handlerModal");
}
</script>
