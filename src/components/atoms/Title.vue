<template>
  <h1 class="text-3xl/20 lg:text-7xl/30 text-gray-300 font-sans">
    {{ title }}
  </h1>
</template>

<script setup>
defineProps({
  title: String,
});
</script>
