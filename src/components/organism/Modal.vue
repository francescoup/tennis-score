<template>
  <Teleport to="body">
    <div
      class="h-screen w-full z-10 bg-gray-800/50 absolute top-0 left-0 p-5 flex justify-center items-start md:items-center"
      aria-labelledby="inizia partita"
      role="dialog"
      aria-modal="true"
    >
      <div
        class="w-full z-20 h-auto md:w-86 bg-white p-10 rounded-xl shadow-2xl"
      >
        <div class="flex flex-col gap-2">
          <!-- <Input v-model="playerOne.nome" />
        <Input v-model="playerTwo.nome" /> -->

          <Inputtest
            v-model:firstName="playerOne.nome"
            label="Giocatore uno"
            placeHolder="inserisci il tuo nome"
          />
          <Inputtest v-model:firstName="playerTwo.nome" label="Giocatore due" />
          <div class="w-full flex justify-center">
            <tennis-ball
              title="this is an icon!"
              fillColor="oklch(0.75 0.183 55.934)"
            />
          </div>
          <Button
            @handler.prevent="closeModal"
            text="Inizia la partita"
            intent="modal"
            :disabled="playerOne.nome && playerTwo.nome ? false : true"
          />
          <Button
            @handler="recordStore"
            text="Record"
            intent="modal"
            :disabled="false"
          />
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import TennisBall from "vue-material-design-icons/TennisBall.vue";
import Button from "../atoms/Button.vue";
import Input from "../atoms/Input.vue";
import Inputtest from "../atoms/Inputtest.vue";
import { useTennisScore } from "../../store/store";
const { playerOne, playerTwo } = useTennisScore();

const emit = defineEmits(["handlerModal", "handlerRecord"]);

function closeModal() {
  emit("handlerModal");
}
function recordStore() {
  emit("handlerRecord");
}
</script>
