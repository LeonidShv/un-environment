import { ref } from "vue";
import { defineStore } from "pinia";
import type { Ref } from "vue";
import api from "@/api";

import type {
  IParamsEnvironmentMap,
  IDataSetsSeriesMap,
} from "@/pages/Map/interfaces/map";

import type { IStructureSeries } from "@/interfaces/common.ts";

export const useMapStore = defineStore("map", () => {
  const dataSetsSeriesForMapChart: Ref<IDataSetsSeriesMap> = ref({});
  const structureSeriesForMapChart: Ref<IStructureSeries[]> = ref([]);

  async function readEnvironmentPieRelativeChart(
    elements: string,
    countries: string,
    params: IParamsEnvironmentMap,
  ): Promise<void> {
    const response = await api.environment.readEnvironment(
      elements,
      countries,
      params,
    );

    dataSetsSeriesForMapChart.value = response.data.dataSets[0].series;
    structureSeriesForMapChart.value =
      response.data.structure.dimensions.series;
  }

  return {
    readEnvironmentPieRelativeChart,
    dataSetsSeriesForMapChart,
    structureSeriesForMapChart,
  };
});
