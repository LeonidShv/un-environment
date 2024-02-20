<template>
  <section>
    <GChart
      type="GeoChart"
      :settings="{
        packages: ['geochart'],
      }"
      :data="chartData"
      :options="chartOptions"
    />
  </section>
</template>

<script setup>
import { GChart } from "vue-google-charts";

const chartData = ref([
  ["Country", "Popularity"],
  ["Germany", 2000],
  ["United States", 3000],
  ["Brazil", 4000],
  ["Canada", 5000],
  ["France", 600],
  ["RU", 0],
]);

const chartOptions = ref({
  chart: {
    title: "Company Performance",
    subtitle: "Sales, Expenses, and Profit: 2014-2017",
  },
});
</script>
