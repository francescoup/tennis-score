<template>
  <div
    @click="emit('handler')"
    :style="{
      transitionDelay: `${delay}ms`,
    }"
    :class="`${
      isOpen ? 'scale-x-100' : ' scale-0'
    } transition duration-500 flex justify-center rounded-full items-center h-10 w-auto px-8 bg-orange-400 shadow-md`"
  >
    <RouterLink :to="link">
      {{ text }}
    </RouterLink>
  </div>
</template>

<script setup>
import { RouterLink } from "vue-router";
defineProps({
  link: String,
  text: String,
  isOpen: Boolean,
  delay: Number,
});
const emit = defineEmits(["handler"]);
</script>
