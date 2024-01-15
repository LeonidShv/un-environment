<template>
  <h2>page</h2>
  <section>
    <h2>Different countries | one element</h2>
    <VSelect
      v-model="elementForDefaultChart"
      :options="elements"
      placeholder="Elements"
      filterable
      multiple
      @change="modifyDefaultChartCriteria"
    />

    <VSelect
      v-model="countriesForDefaultChart"
      :options="countries"
      filterable
      placeholder="Countries"
      multiple
      @change="modifyDefaultChartCriteria"
    />

    <VChart :data="chartDefault" type="Bar" />
    <VChart :data="chartDefault" type="Line" />

    <el-form>
      <VSelect
        v-model="elementForPieChart"
        :options="elements"
        placeholder="Elements"
        filterable
        multiple
        @change="modifyPieChartCriteria"
      />

      <VSelect
        v-model="countriesForPieChart"
        :options="countries"
        filterable
        placeholder="Countries"
        multiple
        @change="modifyPieChartCriteria"
      />

      <VDatePicker
        v-model="yearForPieChart"
        placeholder="Pick a year"
        type="year"
        size="default"
      />
      {{ yearForPieChart }}
    </el-form>

    <VChart :data="chartPie" type="Pie" />
  </section>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useEnvironmentStore } from '@/stores/environment'
import { countries, elements, years, colors } from '@/constants'

import type { FormInstance, FormRules } from 'element-plus'

const store = useEnvironmentStore()
const {
  dataSetsSeriesForDefaultChart,
  structureSeriesForDefaultChart,
  dataSetsSeriesForPieChart,
  structureSeriesForPieChart
} = storeToRefs(store)
const { readEnvironmentDefaultChart, readEnvironmentPieChart } = store

const elementForDefaultChart = ref(['EN_ATM_CO2E_XLULUCF'])
const countriesForDefaultChart = ref(['AUS'])
const chartDefault = ref({
  labels: [],
  datasets: [{ data: [] }]
})

const modifyDefaultChartCriteria = async () => {
  const params = {
    detail: 'full',
    startPeriod: '1960-01-01',
    endPeriod: '2020-12-31',
    dimensionAtObservation: 'TIME_PERIOD'
  }

  await readEnvironmentDefaultChart(
    elementForDefaultChart.value.join('+'),
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

const yearForPieChart = ref('2000-01-01')
const elementForPieChart = ref(['EN_ATM_CO2E_XLULUCF'])
const countriesForPieChart = ref(['AUS'])
const chartPie = ref({
  labels: [],
  datasets: [{ data: [] }]
})

const modifyPieChartCriteria = async () => {
  const params = {
    detail: 'full',
    startPeriod: '2020-01-01',
    endPeriod: '2020-12-31',
    dimensionAtObservation: 'TIME_PERIOD'
  }

  await readEnvironmentPieChart(
    elementForPieChart.value.join('+'),
    countriesForPieChart.value.join('+'),
    params
  )

  // chartPie.value = {
  //   labels: ['one', 'two'],
  //   datasets: [{
  //     data: [10, 30]
  //   }]
  // }

  const datasets = getPieChartData(
    dataSetsSeriesForPieChart.value,
    structureSeriesForPieChart.value
  )
  console.log(dataSetsSeriesForPieChart.value)
  console.log(structureSeriesForPieChart.value)
  chartPie.value = {
    datasets,
    labels: [2020]
  }

  console.log(chartPie.value)
}

function getChartData(dataSetsSeries, structureSeries) {
  const areaStructure = structureSeries.find(
    ({ role }) => role === 'REF_AREA'
  ).values

  const datasets = []
  let index = 0

  for (let key in dataSetsSeries) {
    const rest = Object.entries(dataSetsSeries[key].observations)
      .sort((a, b) => a[0] - b[0])
      .map((item) => item[1][0])

    datasets.push({
      data: rest,
      label: areaStructure[index].name,
      backgroundColor: colors[index] || '#607274',
      borderColor: colors[index] || '#607274'
    })
    index++
  }
  return datasets
}

function getPieChartData(dataSetsSeries, structureSeries) {
  const areaStructure = structureSeries.find(
    ({ role }) => role === 'REF_AREA'
  ).values

  const data = []
  const backgroundColor = []
  const borderColor = []
  let index = 0

  for (let key in dataSetsSeries) {
    const rest = Object.entries(dataSetsSeries[key].observations)
      .sort((a, b) => a[0] - b[0])
      .map((item) => item[1][0])

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
