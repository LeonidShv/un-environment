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
    <VChart
      class="pie-chart"
      :data="chartPieRelative"
      :type="EChartType.Pie"
      :isLoading="isLoading"
      caption="Picture 3. Emissions from various countries, measured in tons in the 2020."
    />
    <VChart
      class="pie-chart"
      :data="chartPiePerPerson"
      :type="EChartType.Pie"
      :isLoading="isLoading"
      caption="Picture 4.Emissions from various countries, measured in tons per person in the 2020."
    />
    <VChart
      class="pie-chart"
      :data="chartPiePerArea"
      :type="EChartType.Pie"
      :isLoading="isLoading"
      caption="Picture 5. Emissions from various countries, measured in tons per square kilometer in the year 2020."
    />
  </div>
</template>

<script setup lang="ts">
import type { IChartPie } from "@/interfaces/chart";
import type { IParamsEnvironment } from "@/pages/Dashboard/interfaces/environment.ts";
import { countries, elements } from "@/constants";
import { useDashboard } from "@/pages/Dashboard/composables/dashboard";
import { EChartType } from "@/interfaces/enums";
import { useEnvironmentStore } from "@/pages/Dashboard/store/environment";

const { getAreaStructure, getPieChartData } = useDashboard();

const store = useEnvironmentStore();
const {
  dataSetsSeriesForPieRelativeChart,
  structureSeriesForPieRelativeChart,
} = storeToRefs(store);
const { readEnvironmentPieRelativeChart } = store;

const elementForPieRelativeChart = ref("EN_ATM_CO2E_XLULUCF");
const countriesForPieRelativeChart = ref(["AUS"]);
const chartPieRelative = ref<IChartPie>({
  labels: [],
  datasets: [],
});
const chartPiePerPerson = ref<IChartPie>({
  labels: [],
  datasets: [],
});
const chartPiePerArea = ref<IChartPie>({
  labels: [],
  datasets: [],
});

const isLoading = ref(true);

// TODO: modifyPieRelativeChartCriteria divide on less functions
const modifyPieRelativeChartCriteria = async () => {
  const params: IParamsEnvironment = {
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
  } catch (e) {
    // empty line
  } finally {
    isLoading.value = false;
  }

  const datasets = getPieChartData(dataSetsSeriesForPieRelativeChart.value);

  const datasetsPerPerson = JSON.parse(JSON.stringify(datasets));
  const datasetsPerArea = JSON.parse(JSON.stringify(datasets));
  const areaStructure = getAreaStructure(
    structureSeriesForPieRelativeChart.value,
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
