<template>
  <VForm class="d-flex wrap gap-1 m-b-1">
    <VFormItem>
      <VSelect
        v-model="elementForDefaultChart"
        :options="elements"
        placeholder="Elements"
        filterable
        :isLoading="isLoading"
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
        :isLoading="isLoading"
        @change="modifyDefaultChartCriteria"
      />
    </VFormItem>
  </VForm>
  <div class="default-chart__wrapper d-flex">
    <VChart
      :data="chartDefault"
      :type="chartType"
      :isLoading="isLoading"
      caption="Picture 1. Emissions from various countries, measured in tons, over different years."
    />
    <VRadioButtons
      v-if="chartDefault.datasets.length"
      v-model="chartType"
      class="radio-buttons"
      :options="chartTypes"
    />
  </div>
</template>

<script setup lang="ts">
import { countries, elements, years } from "@/constants";

import type { IParamsEnvironment } from "@/pages/Dashboard/interfaces/environment.ts";
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

const isLoading = ref(true);

const modifyDefaultChartCriteria = async () => {
  const params: IParamsEnvironment = {
    detail: "full",
    startPeriod: "1960-01-01",
    endPeriod: "2020-12-31",
    dimensionAtObservation: "TIME_PERIOD",
  };

  try {
    isLoading.value = true;
    await readEnvironmentDefaultChart(
      elementForDefaultChart.value,
      countriesForDefaultChart.value.join("+"),
      params,
    );
  } finally {
    isLoading.value = false;
  }
  const datasets = getDefaultChartData(
    dataSetsSeriesForDefaultChart.value,
    structureSeriesForDefaultChart.value,
  );
  chartDefault.value = {
    datasets,
    labels: years,
  };
};

onBeforeMount(async () => {
  await modifyDefaultChartCriteria();
});
</script>

<style lang="scss" scoped>
.default-chart {
  flex: 3;

  &__wrapper {
    width: 800px;
    height: 440px;

    :deep(figure) {
      overflow-x: auto;
    }

    :deep(.chart) {
      @media (max-width: 600px) {
        min-width: 400px;
      }
    }

    @media (max-width: 600px) {
      width: 100%;
      height: 300px;
    }
  }
}

.radio-buttons {
  flex: 1;

  @media (max-width: 600px) {
    display: none;
  }
}
</style>
