<template>
  <div
    class="h-screen w-full bg-yellow-400/8 absolute top-0 left-0 p-5 flex justify-center items-center"
    aria-labelledby="inizia partita"
    role="dialog"
    aria-modal="true"
  >
    <div
      class="h-full w-full md:h-auto md:w-86 bg-white p-10 rounded-xl shadow-2xl"
    >
      ciao sono un modal
      <div class="flex flex-col gap-2">
        <!-- <Input v-model="playerOne.nome" />
        <Input v-model="playerTwo.nome" /> -->
        <Inputtest v-model:firstName="playerOne.nome" label="Giocatore uno" />
        <Inputtest v-model:firstName="playerTwo.nome" label="Giocatore due" />
        <Button @handler="closeModal" text="chiudi" intent="modal" />
        <Button
          @handler="$router.push('/test')"
          text="nuova partita"
          intent="modal"
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
