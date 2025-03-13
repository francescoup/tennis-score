<template>
  <main
    class="bg-gray-900 flex justify-center items-center lg:items-center h-lvh"
  >
    <div class="w-full h-full bg-[url(assets/bg-tennis.jpg)] bg-cover">
      <Transition>
        <div v-if="isShowModal">
          <Modal @handlerModal="time" />
        </div>
      </Transition>

      <div
        class="flex flex-col justify-between lg:justify-center gap-3 p-20 h-full"
      >
        <div>
          <h1 class="text-white text-4xl">Tennis point sistem</h1>
          <p class="text-white">inizia una nuova partita</p>
        </div>

        <div class="w-48">
          <Button text="nuova partita" @handler="showModal" />
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import Button from "../atoms/Button.vue";
import Modal from "../organism/Modal.vue";
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
