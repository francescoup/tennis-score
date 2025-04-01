<template>
  <div class="bg-gray-900 h-screen">
    <RouterView v-slot="{ Component, route }">
      <Transition name="slide">
        <component :is="Component" :key="route.path" />
      </Transition>
    </RouterView>
    <Navbar />
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from "vue-router";
import Navbar from "./components/organism/Navbar.vue";
</script>

<style lang="css" scoped>
.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}

.slide-enter-active,
.slide-leave-active {
  transition: 0.3s ease-out;
}
</style>
