<template>
    <button class="bg-yellow-500 py-2 w-full" @click="emit('handler')">
{{text}}
    </button>
</template>

<script setup>
defineProps({
    text:String
})
const emit = defineEmits('handler')

</script>

