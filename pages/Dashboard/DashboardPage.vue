<template>
  <section class="m-t-2">
    <section>
      <h2 class="m-b-1">Different countries | one element</h2>
      <h3>Absolute values</h3>
      <TheDefaultChart />
    </section>

    <section>
      <h2 class="m-b-1 m-t-2">Different countries | one element | one year</h2>
      <h3>Absolute values</h3>
      <ThePiaChartAbsolute />
    </section>
    <section>
      <h2 class="m-b-1 m-t-2">Different countries | one element | 2020 year</h2>
      <h3>Relative values</h3>
      <ThePiaChartRelative />
    </section>
  </section>
</template>

<script setup lang="ts">
import TheDefaultChart from "@/pages/Dashboard/components/TheDefaultChart";
import ThePiaChartAbsolute from "@/pages/Dashboard/components/ThePiaChartAbsolute";
import ThePiaChartRelative from "@/pages/Dashboard/components/ThePiaChartRelative";
</script>

<style lang="scss">
.chart {
  flex: 3;
}

.radio-buttons {
  flex: 1;
}

.chart--pie {
  width: 30%;
}
</style>
