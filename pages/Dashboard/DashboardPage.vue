<template>
  <section class="p-t-2 p-b-4">
    <h2 class="m-b-1">Different countries | one element</h2>
    <h3>Absolute values</h3>
    <TheDefaultChart />
  </section>

  <section>
    <h2 class="m-b-1 m-t-2">Different countries | one element | one year</h2>
    <h3>Absolute values</h3>
    <ThePiaChartAbsolute />
  </section>
  <section class="p-b-4">
    <h2 class="m-b-1 m-t-2">Different countries | one element | 2020 year</h2>
    <h3>Relative values</h3>
    <ThePiaChartRelative />
  </section>
</template>

<script setup lang="ts">
import TheDefaultChart from "@/pages/Dashboard/components/TheDefaultChart.vue";
import ThePiaChartAbsolute from "@/pages/Dashboard/components/ThePiaChartAbsolute.vue";
import ThePiaChartRelative from "@/pages/Dashboard/components/ThePiaChartRelative.vue";
</script>

<style lang="scss" scoped>
h3 {
  font-size: 24px;
  margin-bottom: 8px;
}
</style>
