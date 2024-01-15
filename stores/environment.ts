import api from '@/api'
import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useEnvironmentStore = defineStore('environment', () => {
  const dataSetsSeriesForDefaultChart = ref()
  const structureSeriesForDefaultChart = ref()

  async function readEnvironmentDefaultChart(elements, countries, params) {
    const response = await api.environment.readEnvironment(
      elements,
      countries,
      params
    )

    dataSetsSeriesForDefaultChart.value = response.data.dataSets[0].series
    structureSeriesForDefaultChart.value = response.data.structure.dimensions.series
  }

  const dataSetsSeriesForPieChart = ref()
  const structureSeriesForPieChart = ref()

  async function readEnvironmentPieChart(elements, countries, params) {
    const response = await api.environment.readEnvironment(
      elements,
      countries,
      params
    )

    dataSetsSeriesForPieChart.value = response.data.dataSets[0].series
    structureSeriesForPieChart.value = response.data.structure.dimensions.series
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
