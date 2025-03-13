<script setup>
const firstName = defineModel("firstName");
defineProps({
  label: String,
});
</script>

<template>
  <label
    >{{ label }}
    <input type="text" v-model="firstName" />
  </label>
</template>
