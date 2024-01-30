<template>
  <section class="m-t-2">
    <h2 class="m-b-1">Different countries | one element</h2>
    <!-- TODO: move to components each section -->
    <h3>Absolute values</h3>
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

    <h2 class="m-b-1 m-t-2">Different countries | one element | one year</h2>
    <h3>Absolute values</h3>
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

    <h2 class="m-b-1 m-t-2">Different countries | one element | 2020 year</h2>
    <h3>Relative values</h3>
    <VForm class="d-flex gap-1 m-b-1">
      <VFormItem>
        <VSelect
          v-model="elementForPieRelativeChart"
          :options="elements"
          placeholder="Elements"
          filterable
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
          @change="modifyPieRelativeChartCriteria"
        />
      </VFormItem>
    </VForm>
    <div class="d-flex gap-2">
      <VChart
        class="chart--pie"
        :data="chartPieRelative"
        :type="EChartType.Pie"
        caption="Picture 3. Emissions from various countries, measured in tons in the 2020."
      />
      <VChart
        class="chart--pie"
        :data="chartPiePerPerson"
        :type="EChartType.Pie"
        caption="Picture 4.Emissions from various countries, measured in tons per person in the 2020."
      />
      <VChart
        class="chart--pie"
        :data="chartPiePerArea"
        :type="EChartType.Pie"
        caption="Picture 5. Emissions from various countries, measured in tons per square kilometer in the year 2020."
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { storeToRefs } from "pinia";
import type { FormRules } from "element-plus";
import { useEnvironmentStore } from "@/stores/environment";
import { countries, elements, years, colors } from "@/constants";

import type { IChartPie, IChartDefault } from "@/interfaces/chart";
import type {
  IParamsEnvironment,
  IDataSetsSeries,
  IStructureSeries,
} from "@/interfaces/common";
import {
  EChartType,
  EDatePickerType,
  EDatePickerSize,
} from "@/interfaces/enums";

const TONS_PER_GG_COEFFICIENT = 1000;

const store = useEnvironmentStore();
const {
  dataSetsSeriesForDefaultChart,
  structureSeriesForDefaultChart,
  dataSetsSeriesForPieChart,
  structureSeriesForPieChart,
  dataSetsSeriesForPieRelativeChart,
  structureSeriesForPieRelativeChart,
} = storeToRefs(store);

const {
  readEnvironmentDefaultChart,
  readEnvironmentPieChart,
  readEnvironmentPieRelativeChart,
} = store;

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

  const datasets = getChartData(
    dataSetsSeriesForDefaultChart.value,
    structureSeriesForDefaultChart.value,
  );
  chartDefault.value = {
    datasets,
    labels: years,
  };
};

function getAreaStructure(structureSeriesForPieChart: IStructureSeries[]) {
  if (!structureSeriesForPieChart || !structureSeriesForPieChart) {
    return undefined;
  }

  const refAreaItem = structureSeriesForPieChart.find(
    ({ role }) => role === "REF_AREA",
  );

  if (!refAreaItem || !refAreaItem.values) {
    return undefined;
  }

  const areaStructure = refAreaItem.values.map(({ name }) => name);
  return areaStructure;
}

function getChartData(
  dataSetsSeries: IDataSetsSeries,
  structureSeries: IStructureSeries[],
) {
  const areaStructure = getAreaStructure(structureSeries);

  const datasets = [];
  let index = 0;

  for (const key in dataSetsSeries) {
    const rest = Object.entries(dataSetsSeries[key].observations)
      .sort((a, b) => Number(a[0]) - Number(b[0]))
      .map((item) => Math.round(item[1][0] * TONS_PER_GG_COEFFICIENT));

    datasets.push({
      data: rest,
      label: areaStructure ? areaStructure[index] : "",
      backgroundColor: colors[index] || "#607274",
      borderColor: colors[index] || "#607274",
    });
    index++;
  }
  return datasets;
}

const elementForPieChart = ref("EN_ATM_CO2E_XLULUCF");
const countriesForPieChart = ref(["AUS"]);
const chartPie = ref<IChartPie>({
  labels: [],
  datasets: [],
});

// const ruleFormRef = ref<FormInstance>();
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

function getPieChartData(dataSetsSeries: IDataSetsSeries) {
  const data = [];
  const backgroundColor = [];
  const borderColor = [];
  let index = 0;

  for (const key in dataSetsSeries) {
    const rest = Object.entries(dataSetsSeries[key].observations)
      .sort((a, b) => Number(a[0]) - Number(b[0]))
      .map((item) => Math.round(item[1][0] * TONS_PER_GG_COEFFICIENT));

    data.push(rest[0]);
    backgroundColor.push(colors[index] || "#607274");
    borderColor.push(colors[index] || "#607274");
    index++;
  }
  return [{ data, backgroundColor, borderColor }];
}

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

// TODO: modifyPieRelativeChartCriteria divide on less functions
const modifyPieRelativeChartCriteria = async () => {
  const params: IParamsEnvironment = {
    detail: "full",
    startPeriod: "2020-01-01",
    endPeriod: "2020-12-31",
    dimensionAtObservation: "TIME_PERIOD",
  };

  await readEnvironmentPieRelativeChart(
    elementForPieRelativeChart.value,
    countriesForPieRelativeChart.value.join("+"),
    params,
  );

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
  await modifyDefaultChartCriteria();
  await modifyPieChartCriteria();
  await modifyPieRelativeChartCriteria();
});
</script>

<style scoped lang="scss">
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
