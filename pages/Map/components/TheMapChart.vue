<template>
  <VForm class="d-flex gap-1 m-b-1">
    <VFormItem>
      <VSelect
        v-model="elementForPieRelativeChart"
        :options="elements"
        placeholder="Elements"
        filterable
        :isLoading="isLoading"
        @change="modifyPieRelativeChartCriteria"
      />
    </VFormItem>

    <VFormItem>
      <VSelect
        v-model="countriesForPieRelativeChart"
        :options="countries"
        filterable
        placeholder="Countries"
        multiple
        :isLoading="isLoading"
        @change="modifyPieRelativeChartCriteria"
      />
    </VFormItem>
  </VForm>
  <div class="d-flex gap-2 pie-chart__wrapper">
    <VChartG
      :type="EChartTypeG.GeoChart"
      :settings="{
        packages: ['geochart'],
      }"
      :chartData="chartData"
    />
    <!-- mapsApiKey: 'secret key' -->
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { EChartTypeG } from "@/interfaces/enums";
import VChartG from "@/components/VChartG.vue";
import { countries, elements } from "@/constants";
import { useMap } from "@/pages/Map/composables/map";
import { useMapStore } from "@/pages/Map/store/map";

import type { IParamsEnvironmentMap } from "@/pages/Map/interfaces/map";

const { getMapChartData } = useMap();

const chartData = ref([
  ["Country", "Element ton"],
  ["Germany", 2000],
  ["United States", 3000],
  ["Brazil", 4000],
  ["Canada", 5000],
  ["France", 600],
  ["RU", 0],
]);

const store = useMapStore();
const { structureSeriesForMapChart, dataSetsSeriesForMapChart } =
  storeToRefs(store);

const { readEnvironmentPieRelativeChart } = store;

const elementForPieRelativeChart = ref("EN_ATM_CO2E_XLULUCF");
const countriesForPieRelativeChart = ref(countries.map(({ value }) => value));

const isLoading = ref(true);

const modifyPieRelativeChartCriteria = async () => {
  const params: IParamsEnvironmentMap = {
    detail: "full",
    startPeriod: "2020-01-01",
    endPeriod: "2020-12-31",
    dimensionAtObservation: "TIME_PERIOD",
  };

  try {
    isLoading.value = true;
    await readEnvironmentPieRelativeChart(
      elementForPieRelativeChart.value,
      countriesForPieRelativeChart.value.join("+"),
      params,
    );
  } finally {
    isLoading.value = false;
  }

  const datasets = getMapChartData(
    dataSetsSeriesForMapChart.value,
    structureSeriesForMapChart.value,
  );

  chartData.value = datasets;
};

onMounted(async () => {
  await modifyPieRelativeChartCriteria();
});
</script>

<style lang="scss" scoped>
.pie-chart {
  width: 30%;

  &__wrapper {
    height: 400px;
  }
}
</style>
