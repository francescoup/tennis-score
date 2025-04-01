<template>
  <div
    class="fixed z-5 flex flex-col gap-3 justify-end items-end bottom-8 right-8 w-48 h-auto"
  >
    <Link
      v-for="item in menuItem"
      key="item.text"
      :link="item.link"
      :text="item.text"
      :delay="item.delay"
      :isOpen="open"
      @handler="openMenu"
    />
    <!-- <Link
      link="/"
      text="Credits"
      :isOpen="open"
      :delay="225"
      @handler="openMenu"
    />
    <Link link="/record" text="Matchs" :isOpen="open" :delay="150" />
    <Link link="/score" text="Tennis score" :isOpen="open" :delay="75" />
    <Link link="/" text="Home page" :isOpen="open" :delay="0" /> -->
    <div :class="`${open ? '' : 'animate-bounce'}`" @click="openMenu">
      <TennisBall size="50" fillColor="oklch(0.879 0.169 91.605)" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Link from "../atoms/Link.vue";
import TennisBall from "vue-material-design-icons/TennisBall.vue";

const open = ref(false);

function openMenu() {
  open.value = !open.value;
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
