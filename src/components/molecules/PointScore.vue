<template>
  <div class="w-full grid grid-cols-2 gap2 text-8xl text-center text-white">
    <div>{{ playerOnePoint }}</div>
    <div>{{ playerTwoPoint }}</div>
  </div>
</template>

<script setup>
defineProps({
  playerOnePoint: Number,
  playerTwoPoint: Number,
});
</script>

<style lang="scss" scoped></style>
