<template>
  <VForm
    refForm="ruleFormRef"
    class="d-flex gap-1 m-b-1"
    :model="ruleForm"
    :rules="rules"
  >
    <VFormItem>
      <VSelect
        v-model="elementForPieChart"
        :options="elements"
        placeholder="Elements"
        filterable
        @change="modifyPieChartCriteria"
      />
    </VFormItem>

    <VFormItem>
      <VSelect
        v-model="countriesForPieChart"
        :options="countries"
        filterable
        placeholder="Countries"
        multiple
        @change="modifyPieChartCriteria"
      />
    </VFormItem>
    <VFormItem prop="yearForPieChart">
      <VDatePicker
        v-model="ruleForm.yearForPieChart"
        placeholder="Pick a year"
        :type="EDatePickerType.year"
        :size="EDatePickerSize.default"
        @change="modifyPieChartCriteria"
      />
    </VFormItem>
  </VForm>
  <VChart
    style="width: 33vw"
    :data="chartPie"
    :type="EChartType.Pie"
    caption="Picture 2. Emissions from various countries, measured in tons in the chosen year."
  />
</template>

<script setup lang="ts">
import type { FormRules } from "element-plus";
import type { IChartPie } from "@/interfaces/chart";
import type { IParamsEnvironment } from "@/pages/Dashboard/interfaces/environment.ts";
import { countries, elements } from "@/constants";
import { useDashboard } from "@/pages/Dashboard/composables/dashboard";
import {
  EChartType,
  EDatePickerType,
  EDatePickerSize,
} from "@/interfaces/enums";
import { useEnvironmentStore } from "@/pages/Dashboard/store/environment";

const { getAreaStructure, getPieChartData } = useDashboard();

const store = useEnvironmentStore();
const { dataSetsSeriesForPieChart, structureSeriesForPieChart } =
  storeToRefs(store);

const { readEnvironmentPieChart } = store;

const elementForPieChart = ref("EN_ATM_CO2E_XLULUCF");
const countriesForPieChart = ref(["AUS"]);
const chartPie = ref<IChartPie>({
  labels: [],
  datasets: [],
});

const ruleForm = reactive({
  yearForPieChart: "2000-01-01",
});
const rules = reactive<FormRules<typeof ruleForm>>({
  yearForPieChart: [{ validator: checkYear, trigger: "blur" }],
});

function checkYear(_rule: any, value: any, callback: any) {
  if (!value) {
    return callback(new Error("Please input the year [1990:2020]"));
  }

  const year = new Date(value).getFullYear();
  if (year < 1990) {
    callback(new Error("Age must be greater than 1989"));
  } else if (year > 2020) {
    callback(new Error("Age must be less than 2021"));
  } else {
    callback();
  }
}

const modifyPieChartCriteria = async () => {
  const year = new Date(ruleForm.yearForPieChart).getFullYear();

  const params: IParamsEnvironment = {
    detail: "full",
    startPeriod: `${year}-01-01`,
    endPeriod: `${year}-12-31`,
    dimensionAtObservation: "TIME_PERIOD",
  };

  await readEnvironmentPieChart(
    elementForPieChart.value,
    countriesForPieChart.value.join("+"),
    params,
  );

  const datasets = getPieChartData(dataSetsSeriesForPieChart.value);

  const areaStructure = getAreaStructure(structureSeriesForPieChart.value);

  chartPie.value = {
    datasets,
    labels: areaStructure,
  };
};

onMounted(async () => {
  await modifyPieChartCriteria();
});
</script>
