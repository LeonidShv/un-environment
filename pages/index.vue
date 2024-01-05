<template>
  <h2>page</h2>
  <section>
    <h2>Different countries | one element</h2>
    <VSelect
      v-model="elementForDifferentCountries"
      :options="elements"
      placeholder="Elements"
      filterable
      multiple
      @change="changeCriteriaForOneElement"
    />

    <p>{{ elementForDifferentCountries }}</p>

    <VSelect
      v-model="countriesForOneElement"
      :options="countries"
      filterable
      placeholder="Countries"
      multiple
      @change="changeCriteriaForOneElement"
    />

    <p>{{ countriesForOneElement }}</p>

    <VChart :data="data" type="Bar" />
    <VChart :data="data" type="Line" />
    <VChart :data="data" type="Pie" />
  </section>
</template>

<script setup>
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useEnvironmentStore } from '@/stores/environment'
import {countries, elements, years, colors} from '@/constants'

const store = useEnvironmentStore()
const { dataSetsSeries, structureSeries } = storeToRefs(store)
const { getEnvironment } = store

const data = ref({
  labels: [],
  datasets: [{ data: [] }]
})

const elementForDifferentCountries = ref(['EN_ATM_CO2E_XLULUCF'])
const countriesForOneElement = ref(['AUS'])

const changeCriteriaForOneElement = async () => {
  await getEnvironment(
    elementForDifferentCountries.value.join('+'),
    countriesForOneElement.value.join('+')
  )

  updateChartData(dataSetsSeries.value, structureSeries.value)
}

function updateChartData(dataSetsSeries, structureSeries) {
  const areaStructure = structureSeries.find(
    ({ role }) => role === 'REF_AREA'
  ).values
console.log('structureSeries',structureSeries);
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

  data.value = {
    labels: years,
    datasets
  }
}

onMounted(async () => {
  await changeCriteriaForOneElement()
})
</script>
