<template>
  <div
    @click.self="closeModal"
    class="h-screen w-full bg-yellow-400/8 absolute z-10 top-0 left-0 p-5 flex justify-center items-start md:items-center"
    aria-labelledby="inizia partita"
    role="dialog"
    aria-modal="true"
  >
    <div class="w-full z-20 h-auto md:w-86 bg-white p-10 rounded-xl shadow-2xl">
      <div class="flex flex-col gap-2">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(["handlerModal"]);

function closeModal() {
  emit("handlerModal");
}
</script>
