<template>
  <button :disabled="disabled" :class="buttonClass" @click="emit('handler')">
    {{ text }}
  </button>
</template>

<script setup>
import { computed } from "vue";
import { cva } from "class-variance-authority";
const props = defineProps({
  text: String,
  disabled: Boolean,
  intent: {
    type: String,
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
          "border-gray-300 text-gray-300 rounded-full hover:bg-white hover:text-slate-800",
        secondary: "bg-yellow-400 rounded-md",
        modal:
          "text-gray-200 bg-orange-400 rounded-full hover:bg-white hover:text-gray-800",
      },
    },
  })({
    intent: props.intent,
  });
});
</script>
