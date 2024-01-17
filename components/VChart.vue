<template>
   <Line v-if="type === 'Line'" :data="data" :options="options" />
   <Pie v-if="type === 'Pie'" :data="data" />
   <Bar v-if="type === 'Bar'" :data="data" />
</template>

<script setup lang="ts">
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
  Colors
} from 'chart.js'
import { Line, Bar, Pie } from 'vue-chartjs'

import type { IChartPie, IChartDefault } from '@/interfaces/chart'
import { EChartType } from '@/interfaces/enums';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Colors
)

interface Props {
  type: EChartType
  data: IChartPie | IChartDefault | any
}

withDefaults(defineProps<Props>(), {
  type: EChartType.Line,
  data: {}
})

const options = ref({
  responsive: true
})
</script>
