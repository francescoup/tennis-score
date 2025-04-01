<template>
  <div class="w-full flex items-center justify-center">
    <span class="text-sm md:text-2xl lg:text-sm text-amber-300">{{
      nome
    }}</span>
  </div>
</template>

<script setup>
defineProps({
  nome: String,
});
</script>
