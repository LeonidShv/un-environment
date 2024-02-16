<template>
  <figure>
    <Line v-if="type === 'Line'" :data="data" :style="myStyles" />
    <Pie v-if="type === 'Pie'" :data="data" :style="myStyles" />
    <Bar v-if="type === 'Bar'" :data="data" :style="myStyles" />

    <figcaption class="m-t-2">
      {{ caption }}
    </figcaption>
  </figure>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
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
  Colors,
} from "chart.js";
import { Line, Bar, Pie } from "vue-chartjs";

import type { IChartPie, IChartDefault } from "@/interfaces/chart";
import { EChartType } from "@/interfaces/enums";

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
  Colors,
);

interface Props {
  type: EChartType;
  data: IChartPie | IChartDefault | any;
  caption: string;
}

const props = withDefaults(defineProps<Props>(), {
  type: EChartType.Line,
  data: {},
  caption: "",
});

const myStyles = ref({
  height: `500px`,
  width: "75vw",
  position: "relative",
});

onMounted(() => {
  console.log(props.type, props.data);
});
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

figcaption {
  color: var(--dark);
}
</style>
