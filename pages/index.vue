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

const store = useEnvironmentStore()
const { dataSetsSeries, structureSeries } = storeToRefs(store)
const { getEnvironment } = store

const years = [
  '1990',
  '1991',
  '1992',
  '1993',
  '1994',
  '1995',
  '1996',
  '1997',
  '1998',
  '1999',
  '2000',
  '2001',
  '2002',
  '2003',
  '2004',
  '2005',
  '2006',
  '2007',
  '2008',
  '2009',
  '2010',
  '2011',
  '2012',
  '2013',
  '2014',
  '2015',
  '2016',
  '2017',
  '2018',
  '2019',
  '2020'
]

const elements = ref([
  {
    value: 'EN_ATM_METH_XLULUCF',
    label: 'Methane (CH4)'
  },
  {
    value: 'EN_ATM_CO2E_XLULUCF',
    label: 'Carbon dioxide (CO2)'
  },
  {
    value: 'EN_CLC_GHGE_XLULUCF',
    label: 'Greenhouse Gas (GHGs)'
  },
  {
    value: 'EN_ATM_HFCE',
    label: 'Hydrofluorocarbons (HFCs)'
  },
  {
    value: 'EN_ATM_NO2E_XLULUCF',
    label: 'Nitrous oxide (N2O)'
  },
  {
    value: 'EN_ATM_PFCE',
    label: 'Perfluorocarbons (PFCs)'
  },
  {
    value: 'EN_ATM_SF6E',
    label: 'Sulphur hexafluoride (SF6)'
  }
])

const countries = ref([
  {
    value: 'AUS',
    label: 'Australia'
  },
  {
    value: 'AUT',
    label: 'Austria'
  },
  {
    value: 'BLR',
    label: 'Belarus'
  },
  {
    value: 'BEL',
    label: 'Belgium'
  },
  {
    value: 'BGR',
    label: 'Bulgaria'
  },
  {
    value: 'CAN',
    label: 'Canada'
  },
  {
    value: 'HRV',
    label: 'Croatia'
  },
  {
    value: 'CYP',
    label: 'Cyprus'
  },
  {
    value: 'CZE',
    label: 'Czech Republic'
  },
  {
    value: 'DNK',
    label: 'Denmark'
  },
  {
    value: 'EST',
    label: 'Estonia'
  },
  {
    value: 'FIN',
    label: 'Finland'
  },
  {
    value: 'FRA',
    label: 'France'
  },
  {
    value: 'DEU',
    label: 'Germany'
  },
  {
    value: 'GRC',
    label: 'Greece'
  },
  {
    value: 'HUN',
    label: 'Hungary'
  },
  {
    value: 'ISL',
    label: 'Iceland'
  },
  {
    value: 'IRL',
    label: 'Ireland'
  },
  {
    value: 'ITA',
    label: 'Italy'
  },
  {
    value: 'JPN',
    label: 'Japan'
  },
  {
    value: 'LVA',
    label: 'Latvia'
  },
  {
    value: 'LIE',
    label: 'Liechtenstein'
  },
  {
    value: 'LTU',
    label: 'Lithuania'
  },
  {
    value: 'LUX',
    label: 'Luxembourg'
  },
  {
    value: 'MLT',
    label: 'Malta'
  },
  {
    value: 'MCO',
    label: 'Monaco'
  },
  {
    value: 'NLD',
    label: 'Netherlands'
  },
  {
    value: 'NZL',
    label: 'New Zealand'
  },
  {
    value: 'NOR',
    label: 'Norway'
  },
  {
    value: 'POL',
    label: 'Poland'
  },
  {
    value: 'PRT',
    label: 'Portugal'
  },
  {
    value: 'ROU',
    label: 'Romania'
  },
  {
    value: 'RUS',
    label: 'Russian Federation'
  },
  {
    value: 'SVK',
    label: 'Slovakia'
  },
  {
    value: 'SVN',
    label: 'Slovenia'
  },
  {
    value: 'ESP',
    label: 'Spain'
  },
  {
    value: 'SWE',
    label: 'Sweden'
  },
  {
    value: 'CHE',
    label: 'Switzerland'
  },
  {
    value: 'TUR',
    label: 'Turkey'
  },
  {
    value: 'UKR',
    label: 'Ukraine'
  },
  {
    value: 'GBR',
    label: 'United Kingdom of Great Britain and Northern Ireland'
  },
  {
    value: 'USA',
    label: 'United States of America'
  },
  {
    value: 'EU1',
    label: 'European Union'
  }
])

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

const colors = [
  '#EA906C',
  '#B31312',
  '#2B2A4C',
  '#A7D397',
  '#E26EE5',
  '#7E30E1',
  '#525CEB',
  '#596FB7',
  '#597E52'
]

function updateChartData(dataSetsSeries, structureSeries) {
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

  data.value = {
    labels: years,
    datasets
  }
}

onMounted(async () => {
  await changeCriteriaForOneElement()
})
</script>
