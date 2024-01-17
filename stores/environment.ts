import api from '@/api'
import { ref } from 'vue'
import { defineStore } from 'pinia'

import type { IParamsEnvironment } from '@/interfaces/common'

export const useEnvironmentStore = defineStore('environment', () => {
  const dataSetsSeriesForDefaultChart = ref()
  const structureSeriesForDefaultChart = ref()

  async function readEnvironmentDefaultChart(elements: string, countries: string, params: IParamsEnvironment) {
    const response = await api.environment.readEnvironment(
      elements,
      countries,
      params
    )

    dataSetsSeriesForDefaultChart.value = response.data.dataSets[0].series
    structureSeriesForDefaultChart.value = response.data.structure.dimensions.series
    console.log('dataSetsSeriesForDefaultChart', dataSetsSeriesForDefaultChart.value);
    console.log('structureSeriesForDefaultChart', structureSeriesForDefaultChart.value);
  }

  const dataSetsSeriesForPieChart = ref()
  const structureSeriesForPieChart = ref()

  async function readEnvironmentPieChart(elements: string, countries: string, params: IParamsEnvironment) {
    const response = await api.environment.readEnvironment(
      elements,
      countries,
      params
    )

    dataSetsSeriesForPieChart.value = response.data.dataSets[0].series
    structureSeriesForPieChart.value = response.data.structure.dimensions.series

    console.log('dataSetsSeriesForPieChart', dataSetsSeriesForPieChart.value);
    console.log('structureSeriesForPieChart', structureSeriesForPieChart.value);
  }

  return { 
    readEnvironmentDefaultChart,
    dataSetsSeriesForDefaultChart,
    structureSeriesForDefaultChart,

    readEnvironmentPieChart,
    dataSetsSeriesForPieChart,
    structureSeriesForPieChart
  }
})
