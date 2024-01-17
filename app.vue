<template>
  <header class="p-h-3">
    <VNavigation class="navigation" :navigation="navigation" />
  </header>
  <main class="p-h-3">
    <NuxtPage />
  </main>
</template>

<script setup lang="ts">
import { ref } from "vue";

import type { INavigationItem } from '@/interfaces/navigation'
import type { Ref } from 'vue'

const navigation: Ref<INavigationItem[]> = ref([
  {
    path: "/",
    label: "Information",
    disabled: false,
  },
  {
    path: "/",
    label: "Cases",
    disabled: false,
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
