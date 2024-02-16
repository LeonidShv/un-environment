<template>
  <VForm class="d-flex gap-1 m-b-1">
    <VFormItem>
      <VSelect
        v-model="elementForDefaultChart"
        :options="elements"
        placeholder="Elements"
        filterable
        @change="modifyDefaultChartCriteria"
      />
    </VFormItem>

    <VFormItem>
      <VSelect
        v-model="countriesForDefaultChart"
        :options="countries"
        filterable
        placeholder="Countries"
        multiple
        @change="modifyDefaultChartCriteria"
      />
    </VFormItem>
  </VForm>
  <div class="d-flex">
    <VChart
      class="chart"
      :data="chartDefault"
      :type="chartType"
      caption="Picture 1. Emissions from various countries, measured in tons, over different years."
    />
    <VRadioButtons
      v-model="chartType"
      class="radio-buttons"
      :options="chartTypes"
    />
  </div>
</template>

<script setup lang="ts">
import { countries, elements, years } from "@/constants";

import type { IParamsEnvironment } from "@/interfaces/common";
import type { IChartDefault } from "@/interfaces/chart";
import { EChartType } from "@/interfaces/enums";
import { useDashboard } from "@/pages/Dashboard/composables/dashboard";
import { useEnvironmentStore } from "@/pages/Dashboard/store/environment";

const { getDefaultChartData } = useDashboard();

const store = useEnvironmentStore();
const { dataSetsSeriesForDefaultChart, structureSeriesForDefaultChart } =
  storeToRefs(store);

const { readEnvironmentDefaultChart } = store;

const elementForDefaultChart = ref("EN_ATM_CO2E_XLULUCF");
const countriesForDefaultChart = ref(["AUS"]);
const chartDefault = ref<IChartDefault>({
  labels: [],
  datasets: [],
});
const chartType = ref(EChartType.Line);
const chartTypes = [
  {
    value: EChartType.Line,
    label: EChartType.Line,
  },
  {
    value: EChartType.Bar,
    label: EChartType.Bar,
  },
];

const modifyDefaultChartCriteria = async () => {
  const params: IParamsEnvironment = {
    detail: "full",
    startPeriod: "1960-01-01",
    endPeriod: "2020-12-31",
    dimensionAtObservation: "TIME_PERIOD",
  };

  await readEnvironmentDefaultChart(
    elementForDefaultChart.value,
    countriesForDefaultChart.value.join("+"),
    params,
  );

  const datasets = getDefaultChartData(
    dataSetsSeriesForDefaultChart.value,
    structureSeriesForDefaultChart.value,
  );
  chartDefault.value = {
    datasets,
    labels: years,
  };
};

onMounted(async () => {
  await modifyDefaultChartCriteria();
});
</script>
