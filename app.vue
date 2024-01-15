<template>
  <header class="p-h-3">
    <VNavigation class="navigation" :navigation="navigation" />
  </header>
  <main class="p-h-3">
    <NuxtPage />
  </main>
</template>

<script setup>
import { ref } from "vue";

const navigation = ref([
  {
    path: "/",
    label: "Information",
  },
  {
    path: "/",
    label: "Cases",
  },
  {
    path: "/",
    label: "Conclusions",
    disabled: true,
  }
]);
</script>

<style lang="scss">
@import './assets/styles/main.scss';
</style>
