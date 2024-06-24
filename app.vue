<template>
  <header class="header p-h-3">
    <VNavigation class="navigation" :navigation="navigation" />
  </header>
  <main class="main p-h-3">
    <NuxtPage />
  </main>

  <footer class="footer d-flex wrap">
    <VFooter />
  </footer>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useEventBus } from "@vueuse/core";
import { ElNotification } from "element-plus";

import type { Ref } from "vue";
import type { INavigationItem } from "@/interfaces/navigation";

const { on } = useEventBus("vue-use-event-bus");

interface IElNotification {
  type: string;
  title: string;
  message: string;
  position: string;
}

on((params: IElNotification | any) => {
  ElNotification(params);
});

const navigation: Ref<INavigationItem[]> = ref([
  {
    path: "/",
    label: "Charts",
    disabled: false,
  },
  {
    path: "/map-pollution",
    label: "Map Pollution",
    disabled: false,
  },
]);
</script>

<style lang="scss">
@import "./assets/styles/main.scss";

.header,
.main,
.footer {
  max-width: 1200px;
  margin: auto;
}

.footer {
  justify-content: space-between;
  padding: 2rem 3rem;
  border-top: 1px solid var(--el-menu-border-color);
}
</style>
