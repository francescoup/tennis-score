<template>
  <div>
    <span
      class="hidden md:block lg:hidden w-full text-sm text-gray-400 text-center"
      >Punteggio</span
    >
    <div
      class="w-full grid grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-2 md:gap-0 lg:gap-2 text-8xl md:text-2xl lg:text-8xl text-center text-white"
    >
      <div>{{ playerOnePoint }}</div>
      <div>{{ playerTwoPoint }}</div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  playerOnePoint: [Number, String],
  playerTwoPoint: [Number, String],
});
</script>

<style lang="scss" scoped></style>
