<template>
  <div
    class="w-full text-lg md:text-2xl lg:text-2xl text-center bg-gray-800/20 text-gray-400"
  >
    <div>{{ pointSet }}</div>
  </div>
</template>

<script setup>
defineProps({
  pointSet: Number,
});
</script>
