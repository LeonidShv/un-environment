<template>
  <section class="m-t-2">
    <h2 class="m-b-1">Different countries | one element</h2>
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
    <div class="chart-default-wrapper d-flex">
      <!-- <VChart :data="chartDefault" type="Bar" /> -->
      <VChart :data="chartDefault" :type="chartType" />
      <VRadioButtons 
        v-model="chartType" 
        :options="chartTypes"
      />
    </div>

    <h2 class="m-b-1 m-t-2">Different countries | one element | one year</h2>
    <VForm
      class="d-flex gap-1 m-b-1"
      ref="ruleFormRef"
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
    <div class="chart-pie-wrapper">
      <VChart :data="chartPie" :type="EChartType.Pie" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useEnvironmentStore } from '@/stores/environment'
import { countries, elements, years, colors } from '@/constants'

import type { FormInstance, FormRules } from 'element-plus'
import type { IChartPie, IChartDefault } from '@/interfaces/chart'
import type {
  IParamsEnvironment,
  IDataSetsSeries,
  IStructureSeries
} from '@/interfaces/common'
import { EChartType, EDatePickerType, EDatePickerSize } from '@/interfaces/enums'

const store = useEnvironmentStore()
const {
  dataSetsSeriesForDefaultChart,
  structureSeriesForDefaultChart,
  dataSetsSeriesForPieChart,
  structureSeriesForPieChart
} = storeToRefs(store)
const { readEnvironmentDefaultChart, readEnvironmentPieChart } = store

const elementForDefaultChart = ref('EN_ATM_CO2E_XLULUCF')
const countriesForDefaultChart = ref(['AUS'])
const chartDefault = ref<IChartDefault>({
  labels: [],
  datasets: []
})
const chartType = ref(EChartType.Line)
const chartTypes = [
  {
    value: EChartType.Line,
    label: EChartType.Line
  },
  {
    value: EChartType.Bar,
    label: EChartType.Bar
  }
]

const modifyDefaultChartCriteria = async () => {
  const params: IParamsEnvironment = {
    detail: 'full',
    startPeriod: '1960-01-01',
    endPeriod: '2020-12-31',
    dimensionAtObservation: 'TIME_PERIOD'
  }

  await readEnvironmentDefaultChart(
    elementForDefaultChart.value,
    countriesForDefaultChart.value.join('+'),
    params
  )

  const datasets = getChartData(
    dataSetsSeriesForDefaultChart.value,
    structureSeriesForDefaultChart.value
  )
  chartDefault.value = {
    datasets,
    labels: years
  }
}

const elementForPieChart = ref('EN_ATM_CO2E_XLULUCF')
const countriesForPieChart = ref(['AUS'])
const chartPie = ref<IChartPie>({
  labels: [],
  datasets: []
})

const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
  yearForPieChart: '2000-01-01'
})
const rules = reactive<FormRules<typeof ruleForm>>({
  yearForPieChart: [{ validator: checkYear, trigger: 'blur' }]
})

function checkYear(rule: any, value: any, callback: any) {
  if (!value) {
    return callback(new Error('Please input the year [1990:2020]'))
  }

  const year = new Date(value).getFullYear()
  if (year < 1990) {
    callback(new Error('Age must be greater than 1989'))
  } else if (year > 2020) {
    callback(new Error('Age must be less than 2021'))
  } else {
    callback()
  }
}

const modifyPieChartCriteria = async () => {
  const year = new Date(ruleForm.yearForPieChart).getFullYear()

  const params: IParamsEnvironment = {
    detail: 'full',
    startPeriod: `${year}-01-01`,
    endPeriod: `${year}-12-31`,
    dimensionAtObservation: 'TIME_PERIOD'
  }

  await readEnvironmentPieChart(
    elementForPieChart.value,
    countriesForPieChart.value.join('+'),
    params
  )

  const datasets = getPieChartData(dataSetsSeriesForPieChart.value)

  const areaStructure = structureSeriesForPieChart.value
    ?.find(({ role }) => role === 'REF_AREA')
    ?.values.map(({ name }) => name)

  chartPie.value = {
    datasets,
    labels: areaStructure
  }
}

function getChartData(dataSetsSeries: IDataSetsSeries, structureSeries: IStructureSeries[]) {
  const areaStructure = structureSeries?.find(
    ({ role }) => role === 'REF_AREA'
  )?.values

  const datasets = []
  let index = 0

  for (let key in dataSetsSeries) {
    const rest = Object.entries(dataSetsSeries[key].observations)
      .sort((a: any, b: any) => Number(a[0]) - Number(b[0]))
      .map((item: any) => item[1][0])

    datasets.push({
      data: rest,
      label: areaStructure ? areaStructure[index].name : '',
      backgroundColor: colors[index] || '#607274',
      borderColor: colors[index] || '#607274'
    })
    index++
  }
  return datasets
}

function getPieChartData(dataSetsSeries: IDataSetsSeries) {
  const data = []
  const backgroundColor = []
  const borderColor = []
  let index = 0

  for (let key in dataSetsSeries) {
    const rest = Object.entries(dataSetsSeries[key].observations)
      .sort((a: any, b: any) => a[0] - b[0])
      .map((item: any) => item[1][0])

    data.push(rest[0])
    backgroundColor.push(colors[index] || '#607274')
    borderColor.push(colors[index] || '#607274')
    index++
  }
  return [{ data, backgroundColor, borderColor }]
}

onMounted(async () => {
  await modifyDefaultChartCriteria()
  await modifyPieChartCriteria()
})
</script>

<style lang="scss" scoped>
.chart-default-wrapper {
  height: 500px;

  @include laptop-lower {
    height: 300px;
  }
}

.chart-pie-wrapper {
  height: 400px;

  @include laptop-lower {
    height: 300px;
  }
}
</style>
