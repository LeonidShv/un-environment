<template>
   <Line v-if="type === 'Line'" :data="data" :options="options" />
   <Pie v-if="type === 'Pie'" :data="data" />
   <Bar v-if="type === 'Bar'" :data="data" />
</template>

<script setup>
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

const options = ref({
  responsive: true
})


defineProps({
  type: {
    type: String,
    default: 'Line',
    validator(value) {
      return ['Pie', 'Line', 'Bar'].includes(value)
    }
  },
  data: {
    type: Object,
    default: () => {}
  }
})
</script>
