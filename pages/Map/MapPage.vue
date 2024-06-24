<template>
  <section class="p-t-2 p-b-4">
    <h2 class="m-t-2 m-b-1">Different countries | one element</h2>
    <h3>Absolute values</h3>
    <p class="map__text">(this is the free version of the map)</p>
    <TheMapChart />
  </section>
</template>

<script setup lang="ts">
import TheMapChart from "@/pages/Map/components/TheMapChart.vue";
</script>

<style lang="scss" scoped>
h3 {
  font-size: 24px;
  margin-bottom: 8px;
}

.map__text {
  font-size: 0.7rem;
}
</style>
