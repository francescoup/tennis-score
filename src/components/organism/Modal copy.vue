<template>
  <div
    class="h-screen w-full bg-yellow-400/8 absolute top-0 left-0 p-5 flex justify-center items-start md:items-center"
    aria-labelledby="inizia partita"
    role="dialog"
    aria-modal="true"
  >
    <div class="w-full h-auto md:w-86 bg-white p-10 rounded-xl shadow-2xl">
      <slot />
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
