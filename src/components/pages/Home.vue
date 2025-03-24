<template>
  <main
    class="bg-gray-900 flex justify-center items-center lg:items-center h-screen"
  >
    <div
      class="w-full h-full bg-[url(assets//img/bg-tennis-min.jpg)] bg-cover bg-top"
    >
      <Transition>
        <div v-if="isShowModal">
          <Modal @handlerModal="sendScore" @handlerRecord="sendRecord" />
        </div>
      </Transition>
      <div
        class="flex flex-col justify-center lg:justify-center gap-3 p-10 md:p-20 h-full"
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
import { ref } from "vue";
import { useRouter } from "vue-router";
import Button from "../atoms/Button.vue";
import Modal from "../organism/Modal.vue";
import Title from "../atoms/Title.vue";
const router = useRouter();
const isShowModal = ref(false);
const showModal = () => {
  isShowModal.value = !isShowModal.value;
};

const sendScore = () => {
  showModal();
  setTimeout(() => {
    return router.push("/score");
  }, 1000);
};
const sendRecord = () => {
  showModal();
  setTimeout(() => {
    return router.push("/record");
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
