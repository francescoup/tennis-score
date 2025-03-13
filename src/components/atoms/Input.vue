<template>
  <div>
    <input
      id="input"
      type="text"
      :value="modelValue"
      @input="handleInput($event)"
      :placeholder="label"
    />
  </div>
</template>

<script setup>
defineProps({
  label: {
    type: String,
    default: "Inserisci il tuo nome",
  },
  modelValue: {
    type: String,
    required: true,
  },
});
const emit = defineEmits(["update:modelValue"]);
const handleInput = ($event) => {
  emit("update:modelValue", $event.target.value);
};
</script>
