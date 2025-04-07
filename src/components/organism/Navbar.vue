<template>
  <div
    :class="{ 'translate-x-full': isactive }"
    class="w-48 h-auto fixed flex flex-col gap-3 justify-end items-end bottom-24 right-8 transition-transform ease-in-out"
  >
    <Link
      v-for="item in menuItem"
      key="item.text"
      :link="item.link"
      :text="item.text"
      :delay="item.delay"
      :isOpen="isOpen"
      @handler="openMenu"
    />
  </div>
  <div
    class="fixed bottom-8 right-8"
    :class="{ 'animate-bounce': isactive }"
    @click="openMenu"
  >
    <TennisBall size="50" fillColor="oklch(0.879 0.169 91.605)" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import Link from "../atoms/Link.vue";
import TennisBall from "vue-material-design-icons/TennisBall.vue";

const isOpen = ref(false);
const isactive = ref(true);

function openMenu() {
  isOpen.value = !isOpen.value;
  isactive.value = !isactive.value;
}
const menuItem = [
  {
    link: "/",
    text: "Home page",
    delay: 0,
  },
  {
    link: "/score",
    text: "Score Page",
    delay: 75,
  },

  {
    link: "/record",
    text: "Matchs saved",
    delay: 150,
  },

  {
    link: "/",
    text: "Credits",
    delay: 225,
  },
];
</script>
