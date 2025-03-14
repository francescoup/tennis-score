<script setup>
const firstName = defineModel("firstName");
defineProps({
  label: String,
});
</script>

<template>
  <label class="block">
    <span className="block text-sm font-medium text-slate-700">{{
      label
    }}</span>
    <input
      class="border border-gray-800 text-gray-800 rounded-full w-full py-2"
      type="text"
      v-model="firstName"
    />
  </label>
</template>
