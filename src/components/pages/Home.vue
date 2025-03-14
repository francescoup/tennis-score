<template>
  <main
    class="bg-gray-900 flex justify-center items-center lg:items-center h-vh"
  >
    <div class="w-full h-full bg-[url(assets/bg-tennis.jpg)] bg-cover bg-top">
      <Transition>
        <div v-if="isShowModal">
          <Modal @handlerModal="time" />
        </div>
      </Transition>

      <div
        class="flex flex-col justify-between lg:justify-center gap-3 p-10 md:p-20 h-full"
      >
        <div>
          <Title title="Tennis Points Sistem" />
          <p class="text-white text-sm md:w-1/3">
            Una web app che monitora il punteggio delle partite di tennis in
            tempo reale, aggiornando set, game e punti. Consente inoltre di
            salvare i dati delle partite per una consultazione futura, creando
            uno storico delle prestazioni.
          </p>
        </div>
        <div class="w-full md:w-48 mt-6">
          <Button
            text="Start new match"
            intent="primary"
            @handler="showModal"
          />
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { computed, ref } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import Button from "../atoms/Button.vue";
import Modal from "../organism/Modal.vue";
import Title from "../atoms/Title.vue";
import { useTennisScore } from "../../store/store";
const router = useRouter();
const isShowModal = ref(false);
const showModal = () => {
  isShowModal.value = !isShowModal.value;
};

const time = () => {
  showModal();
  setTimeout(() => {
    return router.push("/score");
  }, 1000);
};
</script>
<style lang="css">
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
