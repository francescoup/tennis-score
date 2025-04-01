<template>
  <main class="bg-blue-700 h-screen">
    <div
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-8 text-gray-200"
    >
      <div class="lg:col-span-4" v-if="storeMatch.matchs.length == 0">
        <Title title="Nessuna partita salvata" />
      </div>

      <TransitionGroup name="list">
        <div v-for="(singleMatch, index) in storeMatch.matchs" key="index">
          <RecordCard :score="singleMatch" :index="index" />
        </div>
      </TransitionGroup>
    </div>
  </main>
</template>

<script setup>
import Title from "../atoms/Title.vue";
import RecordCard from "../organism/RecordCard.vue";
import { useStoreMatch } from "../../store/matchs";

const storeMatch = useStoreMatch();
</script>
<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
