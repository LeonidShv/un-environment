<template>
  <div>
    <VNavigation class="navigation" :navigation="navigation" />

    <NuxtPage />
  </div>
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
