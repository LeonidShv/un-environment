<template>
  <h2>page</h2>
  <div>
    <VSelect
      v-model="element"
      :options="elements"
      placeholder="Elements"
      filterable
      @change="changeElement"
    />

    <p>{{ element }}</p>

    <VSelect
      v-model="country"
      :options="countries"
      filterable
      placeholder="Countries"
      @change="changeCountry"
    />

    <p>{{ country }}</p>

    <Bar :data="data" :options="options" />
    <Line :data="data" :options="options" />
    <Pie :data="data" :options="options" />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import api from '@/api'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  ArcElement,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Pie, Line, Bar } from 'vue-chartjs'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  BarElement,
  Title,
  Tooltip,
  Legend
)


const data = ref({
  labels: ['January', 'February', 'March'],
  datasets: [{ data: [40, 20, 12] }]
})
const options = ref({
  responsive: true
})

// https://data.un.org/ws/rest/data/UNSD,DF_UNData_UNFCC,1.0/.EN_ATM_CO2E_XLULUCF.AUS./ALL/?detail=full&startPeriod=1990-01-01&endPeriod=2020-12-31&dimensionAtObservation=TIME_PERIOD
// https://data.un.org/ws/rest/data/UNSD,DF_UNData_UNFCC,1.0/.EN_ATM_CO2E_XLULUCF.BEL./ALL/?detail=full&dimensionAtObservation=TIME_PERIOD
const element = ref('EN_ATM_METH_XLULUCF')
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

const country = ref('AUS')
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

// async function getEnvironment() {
//   const response = await api.cases.readEnvironment()

//   this.casesList = response.data
// }

// await getEnvironment()

onMounted(async () => {
  // const response = await api.environment.readEnvironment(
  //   element.value,
  //   country.value
  // )

  // console.log(response)
})

async function changeElement(element) {
  await api.environment.readEnvironment(element)
}

async function changeCountry(country) {
  await api.environment.readEnvironment(country)
}
</script>
