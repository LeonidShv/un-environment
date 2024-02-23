<template>
  <el-container v-loading="isLoading">
    <figure>
      <div class="chart">
        <GChart
          v-if="chartData.length"
          :type="type"
          :settings="settings"
          :data="chartData"
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
import { computed } from "vue";
import { Vue3Lottie } from "vue3-lottie";
import { GChart } from "vue-google-charts";

import noData from "@/assets/animations/noData.json";

import type { IChartPie, IChartDefault } from "@/interfaces/chart";
import { EChartTypeG } from "@/interfaces/enums";

interface Props {
  isLoading: boolean;
  type: EChartTypeG;
  chartData: IChartPie | IChartDefault | any;
  caption: string;
  settings: any;
}

const props = withDefaults(defineProps<Props>(), {
  isLoading: false,
  type: EChartTypeG.LineChart,
  chartData: {},
  caption: "",
  settings: null,
});

const showNoData = computed(() => {
  return !props.isLoading && !props.chartData.length;
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
