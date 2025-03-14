<template>
  <button :class="buttonClass" @click="emit('handler')">
    {{ text }}
  </button>
</template>

<script setup>
import { computed } from "vue";
import { cva } from "class-variance-authority";
const props = defineProps({
  text: String,
  intent: {
    validator: (val) => ["primary", "secondary"].includes(val),
    default: "primary",
  },
});
const emit = defineEmits(["handler"]);
const buttonClass = computed(() => {
  return cva("border transition-colors py-2 w-full", {
    variants: {
      intent: {
        primary:
          "border-gray-300 text-gray-300 rounded-full hover:bg-white hover:text-blue-700",
        secondary: "bg-yellow-400 rounded-md",
        modal:
          "border-gray-800 text-gray-800 rounded-full hover:bg-white hover:text-gray-800",
      },
    },
  })({
    intent: props.intent,
  });
});
</script>
