import api from '@/api'
import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useEnvironmentStore = defineStore('environment', () => {
  const dataSetsSeries = ref()
  const structureSeries = ref()

  async function getEnvironment(elements, countries) {
    const response = await api.environment.readEnvironment(
      elements,
      countries
    )

    dataSetsSeries.value = response.data.dataSets[0].series
    structureSeries.value = response.data.structure.dimensions.series
  }

  return { getEnvironment, dataSetsSeries, structureSeries }
})
