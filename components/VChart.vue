<template>
  <el-container v-loading="isLoading">
    <figure>
      <div class="chart">
        <component
          :is="chartComponent"
          v-if="data.datasets.length"
          :data="data"
          :style="myStyles"
        />
        <div v-else-if="showNoData" class="no-data">
          <Vue3Lottie :animation-data="noData" :height="200" :width="200" />
          <p class="no-data__text">No data</p>
        </div>
      </div>

      <figcaption class="m-t-2">
        {{ caption }}
      </figcaption>
    </figure>
  </el-container>
</template>

<script setup lang="ts">
import { computed, onUpdated } from "vue";
import { Vue3Lottie } from "vue3-lottie";
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
import noData from "@/assets/animations/noData.json";

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
  isLoading: boolean;
  type: EChartType;
  data: IChartPie | IChartDefault | any;
  caption: string;
}

const props = withDefaults(defineProps<Props>(), {
  isLoading: false,
  type: EChartType.Line,
  data: {},
  caption: "",
});

const myStyles = ref({
  width: "100%",
  position: "relative",
});

const chartComponent = computed(() => {
  // INFO: vue-chartjs has issue with dynamic component
  switch (props.type) {
    case "Line":
      return Line;
    case "Bar":
      return Bar;
    default:
      return Pie;
  }
});

const showNoData = computed(() => {
  return !props.isLoading && !props.data.datasets.length;
});
</script>

<style lang="scss" scoped>
figcaption {
  display: block;
  color: var(--dark);
}

figure {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  position: relative;
}

.chart {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.no-data {
  width: 300px;
  height: 230px;
  display: flex;
  flex-direction: column;
  justify-content: end;
}
.no-data__text {
  text-align: center;
}
</style>
