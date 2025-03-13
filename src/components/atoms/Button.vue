<template>
  <button
    class="border border-gray-300 text-gray-300 rounded-full hover:rounded-none hover:bg-white hover:text-blue-700 transition-colors py-2 w-full"
    @click="emit('handler')"
  >
    {{ text }}
  </button>
</template>

<script setup>
defineProps({
  text: String,
});
const emit = defineEmits(["handler"]);
</script>
