<script setup>
const firstName = defineModel("firstName");
defineProps({
  label: String,
  default: "inserisci il tuo nome",
});
</script>

<template>
  <label class="block">
    <span className="block text-sm text-gray-800 font-medium mb-2">{{
      label
    }}</span>
    <input
      class="border border-gray-800 text-gray-800 rounded-full w-full py-2 px-4"
      type="text"
      v-model="firstName"
    />
  </label>
</template>
