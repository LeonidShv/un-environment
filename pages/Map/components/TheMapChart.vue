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
import { getAreaStructure } from "@/helpers/index";
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
const chartPieRelative = ref({
  labels: [],
  datasets: [],
});
const chartPiePerPerson = ref({
  labels: [],
  datasets: [],
});
const chartPiePerArea = ref({
  labels: [],
  datasets: [],
});

const isLoading = ref(true);

// TODO: modifyPieRelativeChartCriteria divide on less functions
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
    structureSeriesForMapChart.value,
    dataSetsSeriesForMapChart.value,
  );
  chartData.value = datasets;

  const datasetsPerPerson = JSON.parse(JSON.stringify(datasets));
  const datasetsPerArea = JSON.parse(JSON.stringify(datasets));
  const areaStructure = getAreaStructure(
    dataSetsSeriesForMapChart.value,
  );
  const filteredCountries = countries.filter(({ label }) =>
    areaStructure?.includes(label),
  );

  datasetsPerPerson[0].data = datasets[0].data.map((item: any, i) => {
    const emissionsPerCoefficient =
      item / filteredCountries[i].population["2020"];
    return emissionsPerCoefficient;
  });

  datasetsPerArea[0].data = datasets[0].data.map((item: any, i) => {
    const emissionsPerCoefficient = item / filteredCountries[i].area["2020"];
    return emissionsPerCoefficient;
  });

  chartPieRelative.value = {
    datasets,
    labels: areaStructure,
  };

  chartPiePerPerson.value = {
    datasets: datasetsPerPerson,
    labels: areaStructure,
  };

  chartPiePerArea.value = {
    datasets: datasetsPerArea,
    labels: areaStructure,
  };
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
~/pages/Map/store/map